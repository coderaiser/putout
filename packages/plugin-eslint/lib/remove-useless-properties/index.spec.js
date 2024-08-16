'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
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
