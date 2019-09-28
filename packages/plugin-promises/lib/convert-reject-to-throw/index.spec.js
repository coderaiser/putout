'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'promises/convert-reject-to-throw': convert,
});

test('plugin-convert-reject-to-throw: transform: report', (t) => {
    t.report('reject', 'Reject is useless in async functions, use throw instead');
    t.end();
});

test('plugin-convert-reject-to-throw: transform', (t) => {
    t.transform('reject');
    t.end();
});

test('plugin-convert-reject-to-throw: transform', (t) => {
    t.noTransform('not-async');
    t.end();
});

test('plugin-convert-reject-to-throw: transform', (t) => {
    t.noTransform('not-fn');
    t.end();
});
