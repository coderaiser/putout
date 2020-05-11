'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-for-to-for-of/n': require('.'),
});

test('plugin-convert-for-to-for-of: report', (t) => {
    t.noReport('no-length');
    t.end();
});

test('plugin-convert-for-to-for-of: transform', (t) => {
    t.noTransform('no-length');
    t.end();
});

