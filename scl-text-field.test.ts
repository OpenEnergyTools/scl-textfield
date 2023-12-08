/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import './scl-text-field.js';
import type { SclTextField } from './scl-text-field.js';

const factor = window.process && process.env.CI ? 5 : 3;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(4000 * factor);

document.body.style.width = '400px';
document.body.style.height = '400px';

describe('Custom SCL related TextField', () => {
  describe('that is non-nullable and has no unit selector', () => {
    let sclTextField: SclTextField;

    beforeEach(async () => {
      sclTextField = await fixture(
        html`<scl-text-field
          label="label"
          required
          value="value"
          placeholder="placeholder"
          supportingText="supportingText"
          suffixText="suffixText"
        ></scl-text-field>`
      );
      document.body.prepend(sclTextField);
    });

    afterEach(() => {
      if (sclTextField) sclTextField.remove();
    });

    it('per default looks like the last screenshot', async () => {
      await timeout(200);
      await visualDiff(
        sclTextField,
        `non-nullable/#1 label-required-value-supportingText-suffixText`
      );
    });

    it('allows to set a placeholder', async () => {
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ press: 'Backspace' }); // trigger input event
      await sendKeys({ press: 'Backspace' }); // trigger input event
      await sendKeys({ press: 'Backspace' }); // trigger input event
      await sendKeys({ press: 'Backspace' }); // trigger input event
      await sendKeys({ press: 'Backspace' }); // trigger input event

      await timeout(200);
      await visualDiff(sclTextField, `non-nullable/#2 placeholder set`);
    });

    it('when disabled looks like the latest screenshot', async () => {
      sclTextField.disabled = true;

      await timeout(200);
      await visualDiff(sclTextField, `non-nullable/#3 disabled`);
    });
  });

  describe('that is nullable and has no unit selector', () => {
    let sclTextField: SclTextField;

    beforeEach(async () => {
      sclTextField = await fixture(
        html`<scl-text-field
          nullable
          label="label"
          value="value"
        ></scl-text-field>`
      );
      document.body.prepend(sclTextField);
    });

    afterEach(() => {
      if (sclTextField) sclTextField.remove();
    });

    it('per default looks like the last screenshot', async () => {
      await timeout(200);

      await visualDiff(sclTextField, `nullable/#1 value set to string`);
    });

    it('when disabled the component looks like the last screenshot', async () => {
      sclTextField.disabled = true;

      await timeout(200);
      await visualDiff(sclTextField, `nullable/#3 disabled`);
    });

    it('when clicked on the nullSwitch looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [380, 20] }); // focus input

      await timeout(200);
      await visualDiff(sclTextField, `nullable/#3 nullSwitch toggled`);
    });
  });

  describe('that is nullable and has a unit selector', () => {
    describe('and missing multiplier and multipliers', () => {
      let sclTextField: SclTextField;

      beforeEach(async () => {
        sclTextField = await fixture(
          html`<scl-text-field
            nullable
            label="label"
            value="value"
            unit="V"
          ></scl-text-field>`
        );
        document.body.prepend(sclTextField);
      });

      afterEach(() => {
        if (sclTextField) sclTextField.remove();
      });

      it('defaults to multiplier null and multipliers null and empty string', async () => {
        await sendMouse({ type: 'click', position: [300, 20] }); // focus input

        await timeout(200);

        await visualDiff(
          document.body,
          `nullable-unit/#1 multipliers defaults to null and empty string`
        );
      });
    });

    describe('and existing multiplier and multipliers', () => {
      let sclTextField: SclTextField;

      beforeEach(async () => {
        sclTextField = await fixture(
          html`<scl-text-field
            nullable
            label="label"
            value="value"
            unit="V"
            .multipliers=${[null, '', 'k', 'M', 'G']}
            .multiplier=${'M'}
          ></scl-text-field>`
        );
        document.body.prepend(sclTextField);
      });

      afterEach(() => {
        if (sclTextField) sclTextField.remove();
      });

      it('indicates the selected multiplier', async () => {
        await sendMouse({ type: 'click', position: [300, 20] }); // focus input

        await timeout(200);

        await visualDiff(
          document.body,
          `nullable-unit/#2 menu list indicates the selected multiplier`
        );
      });

      it('disabled set looks like the last screenshot', async () => {
        sclTextField.disabled = true;

        await timeout(200);
        await visualDiff(sclTextField, `nullable-unit/#3 disabled`);
      });
    });
  });

  describe('that is non-nullable has a unit selector', () => {
    describe('and missing multiplier and multipliers', () => {
      let sclTextField: SclTextField;

      beforeEach(async () => {
        sclTextField = await fixture(
          html`<scl-text-field
            label="label"
            value="value"
            unit="V"
          ></scl-text-field>`
        );
        document.body.prepend(sclTextField);
      });

      afterEach(() => {
        if (sclTextField) sclTextField.remove();
      });

      it('placeholder set looks like the last screenshot', async () => {
        await sendMouse({ type: 'click', position: [300, 20] }); // focus input

        await timeout(200);

        await visualDiff(
          document.body,
          `non-nullable-unit/#1 multipliers defaults to null and empty string`
        );
      });
    });

    describe('and existing multiplier and multipliers', () => {
      let sclTextField: SclTextField;

      beforeEach(async () => {
        sclTextField = await fixture(
          html`<scl-text-field
            label="label"
            value="value"
            unit="V"
            .multipliers=${[null, '', 'k', 'M', 'G']}
            .multiplier=${'M'}
          ></scl-text-field>`
        );
        document.body.prepend(sclTextField);
      });

      afterEach(() => {
        if (sclTextField) sclTextField.remove();
      });

      it('looks like the last screenshot', async () => {
        await sendMouse({ type: 'click', position: [360, 20] }); // focus input

        await timeout(200);

        await visualDiff(
          document.body,
          `non-nullable-unit/#2 menu list indicates the selected multiplier`
        );
      });

      it('disabled set looks like the last screenshot', async () => {
        sclTextField.disabled = true;

        await timeout(200);
        await visualDiff(sclTextField, `non-nullable-unit/#3 disabled`);
      });
    });
  });

  describe('has attributes to restrict text type input', () => {
    let sclTextField: SclTextField;

    beforeEach(async () => {
      sclTextField = await fixture(
        html`<scl-text-field
          pattern="[A-Z]*"
          nullable
          label="label"
          unit="V"
        ></scl-text-field>`
      );
      document.body.prepend(sclTextField);
    });

    afterEach(() => {
      if (sclTextField) sclTextField.remove();
    });

    it('indicates with reportValidity invalid input', async () => {
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ press: '1' }); // trigger input event

      sclTextField.reportValidity();

      await timeout(200);

      await visualDiff(document.body, `restricted-text/reportValidity`);
    });

    it('does not indicated invalid input with checkValidity', async () => {
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ press: '1' }); // trigger input event

      sclTextField.checkValidity();

      await timeout(200);

      await visualDiff(document.body, `restricted-text/checkValidity`);
    });

    it('sets a custom message with setCustomValidity', async () => {
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ press: '1' }); // trigger input event

      sclTextField.setCustomValidity('Only Upper-Case ASCII');
      sclTextField.reportValidity();

      await timeout(200);

      await visualDiff(document.body, `restricted-text/setCustomValidity`);
    });

    it('checks for minLength restriction if set', async () => {
      sclTextField.minLength = 6;
      sclTextField.maxLength = 6;
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ type: 'ABCDE' }); // trigger input event

      sclTextField.reportValidity();

      await timeout(200);

      await visualDiff(document.body, `restricted-text/minLength`);
    });

    it('checks for maxLength restriction if set', async () => {
      sclTextField.maxLength = 8;
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ press: 'A' }); // trigger input event
      await sendKeys({ press: 'B' }); // trigger input event
      await sendKeys({ press: 'C' }); // trigger input event
      await sendKeys({ press: 'D' }); // trigger input event
      await sendKeys({ press: 'E' }); // trigger input event
      await sendKeys({ press: 'F' }); // trigger input event
      await sendKeys({ press: 'G' }); // trigger input event
      await sendKeys({ press: 'H' }); // trigger input event
      await sendKeys({ press: 'I' }); // trigger input event

      sclTextField.reportValidity();

      await timeout(200);

      await visualDiff(document.body, `restricted-text/maxLength`);
    });
  });

  describe('has attributes to restrict number type input', () => {
    let sclTextField: SclTextField;

    beforeEach(async () => {
      sclTextField = await fixture(
        html`<scl-text-field
          type="number"
          label="number"
          required
        ></scl-text-field>`
      );
      document.body.prepend(sclTextField);
    });

    afterEach(() => {
      if (sclTextField) sclTextField.remove();
    });

    it('per default looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ type: 'ABC' }); // trigger input event

      sclTextField.reportValidity();

      await timeout(200);
      await visualDiff(sclTextField, `restriction-number/digits indicator`);
    });

    it('checks for min restriction if set', async () => {
      sclTextField.type = 'number';
      sclTextField.min = '-8';
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ type: '-9' }); // trigger input event

      sclTextField.reportValidity();

      await timeout(200);

      await visualDiff(document.body, `restriction-number/min`);
    });

    it('checks for min restriction if set', async () => {
      sclTextField.type = 'number';
      sclTextField.min = '10';
      sclTextField.max = '12';
      await sendMouse({ type: 'click', position: [10, 10] }); // focus input
      await sendKeys({ type: '13' }); // trigger input event

      sclTextField.reportValidity();

      await timeout(200);

      await visualDiff(document.body, `restriction-number/max`);
    });
  });
});
