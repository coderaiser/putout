'use strict';

const test = require('@putout/test')(__dirname, {
    'apply-destructuring': require('..'),
});

test('plugin-apply-destructuring: transform: report', (t) => {
    t.report('else', 'Apply early return');
    t.end();
});

test('plugin-apply-destructuring: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-apply-destructuring: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-apply-destructuring: no transform: no-return', (t) => {
    t.noTransform('no-return');
    t.end();
});

