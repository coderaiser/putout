'use strict';

const test = require('@putout/test')(__dirname, {
    webpack: require('..'),
});

test('plugin-webpack: transform', (t) => {
    t.transform('loader');
    t.end();
});

test('plugin-webpack: transform: convert-node-to-resolve-fallback', (t) => {
    t.transform('convert-node-to-resolve-fallback');
    t.end();
});

