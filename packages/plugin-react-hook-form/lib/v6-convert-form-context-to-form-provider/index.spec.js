'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    'convert-form-context-to-form-provider': convert,
});

test('plugin-nextjs: convert-form-context-to-form-provider: report', (t) => {
    t.report('convert-form-context-to-form-provider', `Use '<FormProvider/>' instead of '<FormContext/>'`);
    t.end();
});

test('plugin-nextjs: convert-form-context-to-form-provider: no report: no-as', (t) => {
    t.noReport('no-form-context');
    t.end();
});

test('plugin-nextjs: convert-form-context-to-form-provider: transform', (t) => {
    t.transform('convert-form-context-to-form-provider');
    t.end();
});

test('plugin-nextjs: convert-form-context-to-form-provider: transform: attributes', (t) => {
    t.transform('attributes');
    t.end();
});

