'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'tape/convert-called-with-no-args-to-called-with': convert,
});

test('plugin-tape: convert-called-with-no-args-to-called-with: report', (t) => {
    t.report('args', '"calledWithArgs" should be used when arguments are present');
    t.end();
});

test('plugin-tape: convert-called-with-no-args-to-called-with: transform', (t) => {
    t.transform('args');
    t.end();
});

