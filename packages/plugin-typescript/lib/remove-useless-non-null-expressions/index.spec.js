'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-non-null-expressions', plugin],
    ],
});

test('typescript: remove-useless-non-null-expressions: report', (t) => {
    t.report('remove-useless-non-null-expressions', `Avoid useless non null expression: 'foo!!' -> 'foo!'`);
    t.end();
});

test('typescript: remove-useless-non-null-expressions: transform', (t) => {
    t.transform('remove-useless-non-null-expressions');
    t.end();
});

test('typescript: remove-useless-non-null-expressions: transform: optional', (t) => {
    t.transform('optional');
    t.end();
});
