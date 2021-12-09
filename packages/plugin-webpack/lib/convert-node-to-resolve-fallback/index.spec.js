'use strict';

const convertNodeToResolveFallback = require('.');

const test = require('@putout/test')(__dirname, {
    'webpack/convert-node-to-resolve-fallback': convertNodeToResolveFallback,
});

test('plugin-webpack: convert-node-to-resolve-fallback: report', (t) => {
    t.report('node', `"resolve.fallback" should be used instead of "node"`);
    t.end();
});

test('plugin-webpack: convert-node-to-resolve-fallback: transform', (t) => {
    t.transform('node');
    t.end();
});

test('plugin-webpack: convert-node-to-resolve-fallback: no transform: no-node', (t) => {
    t.noTransform('no-node');
    t.end();
});

