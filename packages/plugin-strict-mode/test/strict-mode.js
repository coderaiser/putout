'use strict';

const test = require('@putout/test')(__dirname, {
    'strict-mode': require('..'),
});

test('plugin-strict-mode: transform', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

