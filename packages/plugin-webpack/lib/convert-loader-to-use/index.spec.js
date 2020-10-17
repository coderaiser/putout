'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/convert-loader-to-use': require('.'),
});

test('plugin-putout: report', (t) => {
    t.report('loader', `"use" should be used instead of exclamation mark in loaders`);
    t.end();
});

test('plugin-putout: transform', (t) => {
    t.transform('loader');
    t.end();
});

