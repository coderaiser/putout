'use strict';

const convertAnyToPrimitive = require('..');

const test = require('@putout/test')(__dirname, {
    'convert-any-to-primitive': convertAnyToPrimitive,
});

test('plugin-convert-any-to-primitive: report', (t) => {
    t.report('any', 'Type "number" should be used instead of "any"');
    t.end();
});

test('plugin-convert-any-to-primitive: transform', (t) => {
    t.transform('any');
    t.end();
});

