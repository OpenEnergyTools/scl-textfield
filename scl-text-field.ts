import { css, html, LitElement, TemplateResult } from 'lit';

import { customElement, property, query, state } from 'lit/decorators.js';

import '@material/web/textfield/filled-text-field';
import '@material/web/switch/switch';
import '@material/web/iconbutton/icon-button';
import '@material/web/menu/menu';
import '@material/web/menu/menu-item';
import '@material/web/icon/icon';
import type { CloseMenuEvent } from '@material/web/menu/menu';
import { IconButton } from '@material/web/iconbutton/internal/icon-button';
import { Menu } from '@material/web/menu/internal/menu';
import { Switch } from '@material/web/switch/internal/switch';
import { TextField } from '@material/web/textfield/internal/text-field';

@customElement('scl-text-field')
/** TextField designed to be used for SCL element */
export class SclTextField extends LitElement {
  /** Whether [[`value`]] may be set to `null` by nullSwitch */
  @property({ type: Boolean })
  nullable = false;

  private textFieldValue: string = '';

  /** SCL attributes `value`, can only be `null` if [[`nullable`]]. */
  @property({ type: String })
  get value(): string | null {
    return this.null ? null : this.textFieldValue;
  }

  set value(value: string | null) {
    if (value === null) this.null = true;
    else {
      this.null = false;
      this.textFieldValue = value;
    }
  }

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  label: string = '';

  @property({ type: Boolean })
  required: boolean = false;

  @property({ type: String })
  supportingText: string = '';

  /** The inputs suffix text so long there is no [[`unit`]] defined */
  @property({ type: String })
  suffixText: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: String })
  type: 'number' | 'text' = 'text';

  @property({ type: String })
  pattern: string = '';

  @property({ type: String })
  max: string = '';

  @property({ type: String })
  min: string = '';

  @property({ type: Number })
  maxLength: number = -1;

  @property({ type: Number })
  minLength: number = -1;

  /** SI Unit, must be non-empty to allow for selecting a [[`multiplier`]].
   * Overrides [[`suffixText`]]. */
  @property({ type: String })
  unit = '';

  private multiplierIndex = 0;

  /** Selectable SI multipliers for a non-empty [[`unit`]]. */
  @property({ type: Array })
  multipliers = [null, ''];

  /** The current selected [[`multiplier`]] */
  @property({ type: String })
  get multiplier(): string | null {
    if (this.unit === '') return null;
    return (
      this.multipliers[this.multiplierIndex] ?? this.multipliers[0] ?? null
    );
  }

  set multiplier(value: string | null) {
    const index = this.multipliers.indexOf(value);
    if (index >= 0) this.multiplierIndex = index;
    this.suffixText = (this.multiplier ?? '') + this.unit;
  }

  @state()
  private isNull = false;

  private parkedValue: string | null = null;

  @state()
  private get null(): boolean {
    return this.nullable && this.isNull;
  }

  private set null(value: boolean) {
    if (!this.nullable || value === this.isNull) return;
    this.isNull = value;
    // if (this.isNull) this.parkValue();
    // else this.returnParkedValue();
  }

  @query('.nullswitch.element') nullSwitch?: Switch;

  @query('.multipliers') private multiplierMenu?: Menu;

  @query('.input.element') private textField?: TextField;

  reportValidity(): boolean {
    return this.textField!.reportValidity();
  }

  setCustomValidity(message: string): void {
    this.textField?.setCustomValidity(message);
  }

  checkValidity(): boolean {
    return this.textField!.checkValidity();
  }

  private returnParkedValue(): void {
    if (this.parkedValue === null) return;
    this.textFieldValue = this.parkedValue;
    this.parkedValue = null;
  }

  private parkValue(): void {
    if (this.parkedValue !== null) return;
    this.parkedValue = this.textFieldValue;
  }

  private selectMultiplier(se: CloseMenuEvent): void {
    let selection =
      se.detail.initiator.querySelector(':scope > div')?.textContent;

    if (selection === 'No multiplier') selection = null;
    if (selection !== undefined) this.multiplier = selection;
  }

  private renderMultiplierList(): TemplateResult {
    return html`${this.multipliers.map(multiplier => {
      const value = multiplier === null ? 'No multiplier' : multiplier;

      return html`<md-menu-item
        ?selected=${multiplier === this.multiplier}
        value="${value}"
        @close-menu="${this.selectMultiplier}"
        ><div slot="headline">${value}</div>
      </md-menu-item>`;
    })}`;
  }

  private renderUnitSelector(): TemplateResult {
    if (this.multipliers.length && this.unit)
      return html`<div class="units container">
        <md-icon-button
          id="multiplier-anchor"
          style="margin:5px;"
          ?disabled=${this.null || this.disabled}
          @click=${() => this.multiplierMenu?.show()}
          ><md-icon>more</md-icon></md-icon-button
        >
        <md-menu class="multipliers" anchor="multiplier-anchor"
          >${this.renderMultiplierList()}</md-menu
        >
      </div>`;

    return html``;
  }

  private renderNullSwitch(): TemplateResult {
    if (this.nullable) {
      return html`<md-switch
        class="nullswitch element"
        ?selected=${!this.null}
        ?disabled=${this.disabled}
        @input="${async (evt: Event) => {
          /** TODO(jakob-vogelsang): change when
           * https://github.com/material-components/material-web/issues/5486
           * is fixed */
          evt.stopPropagation();
        }}"
        @change="${async (evt: Event) => {
          this.null = !(evt.target as Switch).selected;
          await this.updateComplete;
          this.dispatchEvent(new Event('input'));
        }}"
      ></md-switch>`;
    }
    return html``;
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div class="input container">
          <md-filled-text-field
            class="input element"
            @input="${(evt: InputEvent) => {
              this.textFieldValue = (evt.target as TextField).value;
            }}"
            value="${this.textFieldValue}"
            ?disabled=${this.disabled || this.isNull}
            label="${this.label}"
            ?required=${this.required}
            supporting-text="${this.supportingText}"
            pattern="${this.pattern}"
            placeholder="${this.placeholder}"
            max="${this.max}"
            min="${this.min}"
            type="${this.type}"
            .maxLength=${this.maxLength}
            .minLength=${this.maxLength}
            suffix-text="${this.suffixText || this.unit}"
          ></md-filled-text-field>
        </div>
        ${this.renderUnitSelector()}
        <div class="nullswitch container">${this.renderNullSwitch()}</div>
      </div>
    `;
  }

  static styles = css`
    .units.container {
      position: relative;
    }

    .nullswitch.element {
      margin-left: 12px;
    }

    .nullswitch.container {
      display: flex;
      align-items: center;
      height: 56px;
    }

    .input.container {
      flex: auto;
    }

    .input.element {
      width: 100%;
    }

    md-icon-button {
      --md-icon-button-icon-size: 48px;
    }
  `;
}
