'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-non-null-expression', plugin],
    ],
});

test('typescript: remove-useless-non-null-expression: report', (t) => {
    t.report('remove-useless-non-null-expression', `Avoid useless non null expression: 'foo!!' -> 'foo!'`);
    t.end();
});

test('typescript: remove-useless-non-null-expression: transform', (t) => {
    t.transform('remove-useless-non-null-expression');
    t.end();
});
