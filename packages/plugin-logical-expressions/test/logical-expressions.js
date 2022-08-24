'use strict';

const {createTest} = require('@putout/test');
const logicalExpressions = require('..');

const test = createTest(__dirname, {
    logicalExpressions,
});

test('plugin-logical-expressions: transform: simplify', (t) => {
    t.transform('simplify');
    t.end();
});

test('plugin-logical-expressions: transform: remove-boolean', (t) => {
    t.transform('remove-boolean');
    t.end();
});

test('plugin-logical-expressions: convert-bitwise-to-logical', (t) => {
    t.transform('convert-bitwise-to-logical');
    t.end();
});

