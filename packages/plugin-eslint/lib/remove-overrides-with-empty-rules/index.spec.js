'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'eslint/remove-overrides-with-empty-rules': plugin,
});

test('putout: plugin-eslint: remove-remove-overrides-with-empty-rules: report', (t) => {
    t.report('remove-overrides-with-empty-rules', `Avoid 'overrides' with empty 'rules'`);
    t.end();
});

test('putout: plugin-eslint: remove-remove-overrides-with-empty-rules: transform', (t) => {
    t.transform('remove-overrides-with-empty-rules');
    t.end();
});

