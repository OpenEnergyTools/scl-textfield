import { html, TemplateResult } from 'lit';

import './scl-text-field.js';

export default {
  title: 'scl-text-field',
  component: 'scl-text-field',
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  value: string | null;
  disabled: boolean;
  label: string;
  required: boolean;
  supportingText: string;
  pattern: string;
  placeholder: string;
  max: string;
  min: string;
  type: 'number' | 'text';
  maxLength: number;
  minLength: number;
  suffixText: string;
  nullable: boolean;
  multipliers: (string | null)[];
  multiplier: string;
  unit: string;
}

const TextFieldTemplate: Story<ArgTypes> = ({
  value = null,
  disabled = false,
  label = 'label',
  required = false,
  supportingText = 'supportingText',
  pattern = '',
  placeholder = 'placeholder',
  max = '16',
  min = '4',
  type = 'text',
  maxLength = -1,
  minLength = -1,
  suffixText = 'suf',
}) =>
  html`
    <scl-text-field
      .value="${value}"
      ?disabled=${false}
      label="${label}"
      ?required=${required}
      supportingText="${supportingText}"
      pattern="${pattern}"
      placeholder="${placeholder}"
      max="${max}"
      min="${min}"
      type="${type}"
      .maxLength=${maxLength}
      .minLength=${minLength}
      suffixText=${suffixText}
    >
    </scl-text-field>
  `;

export const PlainTextField = TextFieldTemplate.bind({});
TextFieldTemplate.args = {
  value: 'value',
  disabled: false,
  label: 'label',
  required: false,
  supportingText: 'supportingText',
  pattern: '[A-Z]*',
  placeholder: 'placeholder',
  type: 'text',
  suffixText: 'suf',
  nullable: false,
};

const NulledTextFieldTemplate: Story<ArgTypes> = ({
  value = null,
  disabled = false,
  label = 'label',
  required = false,
  supportingText = 'supportingText',
  pattern = '',
  placeholder = 'placeholder',
  max = '16',
  min = '4',
  type = 'text',
  maxLength = -1,
  minLength = -1,
  suffixText = 'suf',
  nullable = true,
}) =>
  html`
    <scl-text-field
      .value="${value}"
      ?disabled=${false}
      label="${label}"
      ?required=${required}
      supportingText="${supportingText}"
      pattern="${pattern}"
      placeholder="${placeholder}"
      max="${max}"
      min="${min}"
      type="${type}"
      .maxLength=${maxLength}
      .minLength=${minLength}
      suffixText=${suffixText}
      ?nullable=${true}
    >
    </scl-text-field>
  `;

export const NulledTextField = NulledTextFieldTemplate.bind({});
NulledTextField.args = {
  value: 'value',
  disabled: false,
  label: 'label',
  required: false,
  supportingText: 'supportingText',
  pattern: 'pattern',
  placeholder: 'placeholder',
  max: '18',
  min: '4',
  type: 'text',
  maxLength: -1,
  minLength: -1,
  suffixText: 'suf',
  nullable: true,
};

const MultiplierTextFieldTemplate: Story<ArgTypes> = ({
  value = null,
  disabled = false,
  label = 'label',
  required = false,
  supportingText = 'supportingText',
  pattern = '',
  placeholder = 'placeholder',
  max = '16',
  min = '4',
  type = 'text',
  maxLength = -1,
  minLength = -1,
  suffixText = 'suf',
  nullable = true,
  unit = 'V',
  multipliers = [null, 'm', '', 'k', 'M'],
  multiplier = 'k',
}) =>
  html`
    <scl-text-field
      .value="${value}"
      ?disabled=${false}
      label="${label}"
      ?required=${required}
      supportingText="${supportingText}"
      pattern="${pattern}"
      placeholder="${placeholder}"
      max="${max}"
      min="${min}"
      type="${type}"
      .maxLength=${maxLength}
      .minLength=${minLength}
      suffixText=${suffixText}
      ?nullable=${nullable}
      unit="${unit}"
      .multipliers=${multipliers}
      .multiplier=${multiplier}
    >
    </scl-text-field>
  `;

export const MultiplierTextField = MultiplierTextFieldTemplate.bind({});
MultiplierTextField.args = {
  value: 'value',
  disabled: false,
  label: 'label',
  required: false,
  supportingText: 'supportingText',
  pattern: 'pattern',
  placeholder: 'placeholder',
  max: '18',
  min: '4',
  type: 'text',
  maxLength: -1,
  minLength: -1,
  suffixText: 'suf',
  nullable: true,
  multipliers: [null, 'm', '', 'k', 'M'],
  multiplier: 'k',
  unit: 'V',
};
