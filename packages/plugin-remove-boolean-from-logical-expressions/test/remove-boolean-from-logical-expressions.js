'use strict';

const removeBooleanFromLogicalExpressions = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-boolean-from-logical-expressions': removeBooleanFromLogicalExpressions,
});

test('plugin-remove-boolean-from-logical-expressions: report', (t) => {
    t.report('logical', '"true" and "false" has no sense in logical expressions');
    t.end();
});

test('plugin-remove-boolean-from-logical-expressions: transform: logical', (t) => {
    t.transform('logical');
    t.end();
});

test('plugin-remove-boolean-from-logical-expressions: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-remove-boolean-from-logical-expressions: transform: or', (t) => {
    t.noTransform('or');
    t.end();
});

