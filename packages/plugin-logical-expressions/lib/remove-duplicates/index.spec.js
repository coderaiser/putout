'use strict';

const {createTest} = require('@putout/test');
const LogicalExpression = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['-logical-expression', LogicalExpression],
    ],
});

test('plugin-logical-expression: remove-duplicates: report: duplicates', (t) => {
    t.report('duplicates', 'Avoid duplicates in logical expressions');
    t.end();
});

test('plugin-logical-expression: remove-duplicates: transform: duplicates', (t) => {
    t.transform('duplicates');
    t.end();
});

test('plugin-logical-expression: transform: remove-duplicates: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-logical-expression: no transform: remove-duplicates: different', (t) => {
    t.noTransform('different');
    t.end();
});
