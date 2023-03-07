'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'maybe/array': convert,
});

test('plugin-maybe: array: report', (t) => {
    t.report('array', `Use 'maybeArray()'`);
    t.end();
});

test('plugin-maybe: array: transform', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-maybe: array: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
