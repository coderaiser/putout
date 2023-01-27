'use strict';

const {createTest} = require('@putout/test');
const reactHookForm = require('..');
const test = createTest(__dirname, {
    'react-hook-form': reactHookForm,
});

test('plugin-react-hook-form: transform: v7-apply-form-state', (t) => {
    t.transform('v7-apply-form-state');
    t.end();
});

test('plugin-react-hook-form: transform: v6-apply-clear-errors', (t) => {
    t.transform('v6-apply-clear-errors');
    t.end();
});

test('plugin-react-hook-form: transform: v6-convert-as-to-render', (t) => {
    t.transform('v6-convert-as-to-render');
    t.end();
});

test('plugin-react-hook-form: transform: v6-convert-form-context-to-form-provider', (t) => {
    t.transform('v6-convert-form-context-to-form-provider');
    t.end();
});

test('plugin-react-hook-form: transform: v6-convert-trigger-validation-to-trigger', (t) => {
    t.transform('v6-convert-trigger-validation-to-trigger');
    t.end();
});

test('plugin-react-hook-form: transform: v5-remove-value-from-control', (t) => {
    t.transform('v5-remove-value-from-control');
    t.end();
});

