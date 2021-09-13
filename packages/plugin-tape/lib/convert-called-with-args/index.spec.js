'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/convert-called-with-arguments': require('.'),
});

test('plugin-tape: convert-called-with-arguments: report', (t) => {
    t.report('args', `Use 'array' as calledWith 'args'`);
    t.end();
});

test('plugin-tape: convert-called-with-arguments: transform', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-tape: convert-called-with-arguments: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('plugin-tape: convert-called-with-arguments: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});

