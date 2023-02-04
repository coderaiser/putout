'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'apply-maybe/apply-async-formatter': convert,
});

test('plugin-apply-maybe: fn: report', (t) => {
    t.report('fn', `Use 'maybeFn()'`);
    t.end();
});

test('plugin-apply-maybe: fn: transform', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-apply-maybe: fn: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
