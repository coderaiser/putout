'use strict';

const {createTest} = require('@putout/test');
const removeOverrides = require('../remove-overrides-with-empty-rules');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-properties', plugin],
    ],
});

test('eslint: remove-useless-properties: report', (t) => {
    t.report('remove-useless-properties', `Remove useless properties: rules`);
    t.end();
});

test('eslint: remove-useless-properties: transform', (t) => {
    t.transform('remove-useless-properties');
    t.end();
});

test('eslint: remove-useless-properties: transform: call-expression-empty-object', (t) => {
    t.transform('call-expression-empty-object', {
        removeOverrides,
    });
    t.end();
});
