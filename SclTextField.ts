import { css, html, LitElement, TemplateResult } from 'lit';

import { property, query, state } from 'lit/decorators.js';

import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

import {
  CloseMenuEvent,
  MdMenu,
} from '@scopedelement/material-web/menu/MdMenu.js';
import { MdFilledTextField } from '@scopedelement/material-web/textfield/MdFilledTextField.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import { MdIconButton } from '@scopedelement/material-web/iconbutton/MdIconButton.js';
import { MdMenuItem } from '@scopedelement/material-web/menu/MdMenuItem.js';
import { MdSwitch } from '@scopedelement/material-web/switch/MdSwtich.js';
import { TextField } from '@scopedelement/material-web/textfield/internal/text-field';

/** TextField designed to be used for SCL element */
export class SclTextField extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'md-filled-text-field': MdFilledTextField,
    'md-switch': MdSwitch,
    'md-icon': MdIcon,
    'md-icon-button': MdIconButton,
    'md-menu': MdMenu,
    'md-menu-item': MdMenuItem,
  };

  /** Whether [[`value`]] may be set to `null` by nullSwitch */
  @property({ type: Boolean })
  nullable = false;

  @state()
  private textFieldValue: string = '';

  /** SCL attributes `value`, can only be `null` if [[`nullable`]]. */
  @property({ type: String })
  set value(value: string | null) {
    if (value === null) this.null = true;
    else {
      this.null = false;
      this.textFieldValue = value;
    }
  }

  get value(): string | null {
    return this.null ? null : this.textFieldValue;
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

  @query('.nullswitch.element') nullSwitch?: MdSwitch;

  @query('.multipliers') private multiplierMenu?: MdMenu;

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

  reset(): void {
    return this.textField!.reset();
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
          this.null = !(evt.target as MdSwitch).selected;
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
            .minLength=${this.minLength}
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
