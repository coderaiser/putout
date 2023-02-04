'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'apply-maybe/apply-async-formatter': convert,
});

test('plugin-apply-maybe: array: report', (t) => {
    t.report('array', `Use 'maybeArray()'`);
    t.end();
});

test('plugin-apply-maybe: array: transform', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-maybe: array: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
