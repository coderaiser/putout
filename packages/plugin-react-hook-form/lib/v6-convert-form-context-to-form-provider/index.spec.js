'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['v6-convert-form-context-to-form-provider', convert],
    ],
});

test('plugin-nextjs: v6-convert-form-context-to-form-provider: report', (t) => {
    t.report('v6-convert-form-context-to-form-provider', `Use '<FormProvider/>' instead of '<FormContext/>'`);
    t.end();
});

test('plugin-nextjs: v6-convert-form-context-to-form-provider: no report: no-form-context', (t) => {
    t.noReport('no-form-context');
    t.end();
});

test('plugin-nextjs: v6-convert-form-context-to-form-provider: transform', (t) => {
    t.transform('v6-convert-form-context-to-form-provider');
    t.end();
});

test('plugin-nextjs: v6-convert-form-context-to-form-provider: transform: attributes', (t) => {
    t.transform('attributes');
    t.end();
});
