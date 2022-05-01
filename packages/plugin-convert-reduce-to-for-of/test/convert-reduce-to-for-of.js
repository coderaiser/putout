'use strict';

const {createTest} = require('@putout/test');
const convertMapToForOf = require('..');

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

