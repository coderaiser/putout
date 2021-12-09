'use strict';

const strictMode = require('..');

const test = require('@putout/test')(__dirname, {
    'strict-mode': strictMode,
});

test('plugin-strict-mode: transform', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

