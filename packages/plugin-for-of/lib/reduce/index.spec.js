'use strict';

const {createTest} = require('@putout/test');
const removeNestedBlocks = require('@putout/plugin-remove-nested-blocks');

const convertMapToForOf = require('.');

const test = createTest(__dirname, {
    'convert-reduce-to-for-of': convertMapToForOf,
});

test('plugin-convert-reduce-to-for-of: report', (t) => {
    t.report('reduce', `Use 'for...of' instead of '.reduce()'`);
    t.end();
});

test('plugin-convert-reduce-to-for-of: transform', (t) => {
    t.transform('reduce');
    t.end();
});

test('plugin-convert-reduce-to-for-of: transform: two', (t) => {
    t.transform('two');
    t.end();
});

test('plugin-convert-reduce-to-for-of: transform: initial', (t) => {
    t.transform('initial', {
        'remove-nested-blocks': removeNestedBlocks,
    });
    t.end();
});

test('plugin-convert-reduce-to-for-of: no transform: call-expression', (t) => {
    t.noTransform('call-expression');
    t.end();
});
