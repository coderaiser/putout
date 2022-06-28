'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    'apply-comparison-order': plugin,
});

test('plugin-apply-comparison-order: transform: report', (t) => {
    t.report('order', `Swap '[]' with 'a'`);
    t.end();
});

test('plugin-apply-comparison-order: transform', (t) => {
    t.transform('order');
    t.end();
});

test('plugin-apply-comparison-order: no transform: not-logical', (t) => {
    t.noTransform('not-logical');
    t.end();
});

test('plugin-apply-comparison-order: no transform: simple-right', (t) => {
    t.noTransform('simple-right');
    t.end();
});

