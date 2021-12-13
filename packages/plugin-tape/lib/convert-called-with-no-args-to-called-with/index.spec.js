'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
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

test('plugin-tape: convert-called-with-no-args-to-called-with: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

