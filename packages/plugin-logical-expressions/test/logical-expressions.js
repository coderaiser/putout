'use strict';

const {createTest} = require('@putout/test');
const logicalExpressions = require('..');

const test = createTest(__dirname, {
    'logical-expressions': logicalExpressions,
});

test('plugin-logical-expressions: transform: simplify', (t) => {
    t.transform('simplify');
    t.end();
});

test('plugin-logical-expressions: transform: remove-boolean', (t) => {
    t.transform('remove-boolean');
    t.end();
});

test('plugin-logical-expressions: transform: remove-duplicates', (t) => {
    t.transform('remove-duplicates');
    t.end();
});

test('plugin-logical-expressions: convert-bitwise-to-logical', (t) => {
    t.transform('convert-bitwise-to-logical');
    t.end();
});

