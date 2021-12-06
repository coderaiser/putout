'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'tape/apply-async-formatter': convert,
});

test('plugin-tape: apply-async-formatter: report', (t) => {
    t.report('formatter', 'Use Async API to test Formatter');
    t.end();
});

test('plugin-tape: apply-async-formatter', (t) => {
    t.transform('formatter');
    t.end();
});

