'use strict';

const test = require('@putout/test')(__dirname, {
    'simplify-logical-expression': require('..'),
});

test('plugin-simplify-logical-expression: report', (t) => {
    t.report('not', 'Logical expression should be simplified');
    t.end();
});

test('plugin-simplify-logical-expression: transform', (t) => {
    t.transform('not');
    t.end();
});

