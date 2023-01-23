'use strict';

const {createTest} = require('@putout/test');
const reactHookForm = require('..');
const test = createTest(__dirname, {
    'react-hook-form': reactHookForm,
});

test('plugin-react-hook-form: transform: remove-value-from-control', (t) => {
    t.transform('remove-value-from-control');
    t.end();
});

test('plugin-react-hook-form: transform: apply-clear-errors', (t) => {
    t.transform('apply-clear-errors');
    t.end();
});

test('plugin-react-hook-form: transform: convert-as-to-render', (t) => {
    t.transform('convert-as-to-render');
    t.end();
});
