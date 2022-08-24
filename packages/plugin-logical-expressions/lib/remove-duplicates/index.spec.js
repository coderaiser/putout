'use strict';

const {createTest} = require('@putout/test');
const LogicalExpression = require('.');

const test = createTest(__dirname, {
    '-logical-expression': LogicalExpression,
});

test('plugin-logical-expression: remove-duplicates: report', (t) => {
    t.report('duplicates', 'Avoid duplicates in logical expressions');
    t.end();
});

test('plugin-logical-expression: remove-duplicates: transform: duplicates', (t) => {
    t.transform('duplicates');
    t.end();
});

test('plugin-logical-expression: transform: remove-duplicats: same', (t) => {
    t.transform('same');
    t.end();
});

