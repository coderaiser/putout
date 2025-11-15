'use strict';

const {createTest} = require('@putout/test');
const plugin = require('./index.js');

const test = createTest(__dirname, {
    plugins: [
        ['remove-errors-type', plugin],
    ],
});

test('eslint-plugin: remove-errors-type: report', (t) => {
    t.report('remove-errors-type', `Remove 'type' field`);
    t.end();
});

test('eslint-plugin: remove-errors-type: transform', (t) => {
    t.transform('remove-errors-type');
    t.end();
});
