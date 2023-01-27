'use strict';

const {createTest} = require('@putout/test');
const convertAsToRender = require('.');

const test = createTest(__dirname, {
    'convert-trigger-validation-to-trigger': convertAsToRender,
});

test('plugin-nextjs: convert-trigger-validation-to-trigger: report', (t) => {
    t.report('convert-trigger-validation-to-trigger', `Use 'trigger()' instead of 'triggerValidation()'`);
    t.end();
});

test('plugin-nextjs: convert-trigger-validation-to-trigger: no report: no-as', (t) => {
    t.noReport('no-trigger-validation');
    t.end();
});

test('plugin-nextjs: convert-trigger-validation-to-trigger: transform', (t) => {
    t.transform('convert-trigger-validation-to-trigger');
    t.end();
});

