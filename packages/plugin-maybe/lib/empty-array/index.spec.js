'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'maybe/apply-async-formatter': convert,
});

test('plugin-maybe: empty-array: report', (t) => {
    t.report('empty-array', `Use 'maybeEmptyArray()'`);
    t.end();
});

test('plugin-maybe: empty-array: transform', (t) => {
    t.transform('empty-array');
    t.end();
});

test('plugin-maybe: empty-array: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
