# \<scl-text-field>

This is a web component meant to be used for SCL type attributes. In addition to default input it allows to have a `value="null"` for XML type attributes. In addition to that is allows to set a `unit` and `multiplier` for specific SCL element such as `VoltageLevel` or `SubNetwork`.

## Usage

This element was meant to be used only for plugins in this organization. If it still fills you bill please use or re-use it. But be aware that we will not react on features wishes that do not contribute to the needs of plugin in this organization.


## `scl-text-field.ts`:

### class: `SclTextField`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name             | Privacy | Type                  | Default      | Description                                                                                                   | Inherited From |
| ---------------- | ------- | --------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- | -------------- |
| `nullable`       |         | `boolean`             | `false`      | Whether \[\[\`value\`]] may be set to \`null\` by nullSwitch                                                  |                |
| `value`          |         | `string \| null`      |              | SCL attributes \`value\`, can only be \`null\` if \[\[\`nullable\`]].                                         |                |
| `disabled`       |         | `boolean`             | `false`      |                                                                                                               |                |
| `label`          |         | `string`              | `''`         |                                                                                                               |                |
| `required`       |         | `boolean`             | `false`      |                                                                                                               |                |
| `supportingText` |         | `string`              | `''`         |                                                                                                               |                |
| `suffixText`     |         | `string`              | `''`         | The inputs suffix text so long there is no \[\[\`unit\`]] defined                                             |                |
| `placeholder`    |         | `string`              | `''`         |                                                                                                               |                |
| `type`           |         | `'number' \| 'text'`  | `'text'`     |                                                                                                               |                |
| `pattern`        |         | `string`              | `''`         |                                                                                                               |                |
| `max`            |         | `string`              | `''`         |                                                                                                               |                |
| `min`            |         | `string`              | `''`         |                                                                                                               |                |
| `maxLength`      |         | `number`              | `-1`         |                                                                                                               |                |
| `minLength`      |         | `number`              | `-1`         |                                                                                                               |                |
| `unit`           |         | `string`              | `''`         | SI Unit, must be non-empty to allow for selecting a \[\[\`multiplier\`]].&#xA;Overrides \[\[\`suffixText\`]]. |                |
| `multipliers`    |         | `array`               | `[null, '']` | Selectable SI multipliers for a non-empty \[\[\`unit\`]].                                                     |                |
| `multiplier`     |         | `string \| null`      |              | The current selected \[\[\`multiplier\`]]                                                                     |                |
| `nullSwitch`     |         | `Switch \| undefined` |              |                                                                                                               |                |

#### Methods

| Name                | Privacy | Description | Parameters        | Return    | Inherited From |
| ------------------- | ------- | ----------- | ----------------- | --------- | -------------- |
| `reportValidity`    |         |             |                   | `boolean` |                |
| `setCustomValidity` |         |             | `message: string` | `void`    |                |
| `checkValidity`     |         |             |                   | `boolean` |                |

#### Events

| Name    | Type    | Description | Inherited From |
| ------- | ------- | ----------- | -------------- |
| `input` | `Event` |             |                |

<details><summary>Private API</summary>

#### Fields

| Name              | Privacy | Type                     | Default | Description | Inherited From |
| ----------------- | ------- | ------------------------ | ------- | ----------- | -------------- |
| `textFieldValue`  | private | `string`                 | `''`    |             |                |
| `multiplierIndex` | private | `number`                 | `0`     |             |                |
| `isNull`          | private | `boolean`                | `false` |             |                |
| `parkedValue`     | private | `string \| null`         | `null`  |             |                |
| `null`            | private | `boolean`                |         |             |                |
| `multiplierMenu`  | private | `Menu \| undefined`      |         |             |                |
| `textField`       | private | `TextField \| undefined` |         |             |                |

#### Methods

| Name                   | Privacy | Description | Parameters           | Return           | Inherited From |
| ---------------------- | ------- | ----------- | -------------------- | ---------------- | -------------- |
| `returnParkedValue`    | private |             |                      | `void`           |                |
| `parkValue`            | private |             |                      | `void`           |                |
| `selectMultiplier`     | private |             | `se: CloseMenuEvent` | `void`           |                |
| `renderMultiplierList` | private |             |                      | `TemplateResult` |                |
| `renderUnitSelector`   | private |             |                      | `TemplateResult` |                |
| `renderNullSwitch`     | private |             |                      | `TemplateResult` |                |

</details>

<hr/>

### Exports

| Kind | Name           | Declaration  | Module            | Package |
| ---- | -------------- | ------------ | ----------------- | ------- |
| `js` | `SclTextField` | SclTextField | scl-text-field.ts |         |


&copy; 2023 The Contributors
