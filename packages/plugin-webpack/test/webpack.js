'use strict';

const {createTest} = require('@putout/test');
const webpack = require('..');

const test = createTest(__dirname, {
    webpack,
});

test('plugin-webpack: transform', (t) => {
    t.transform('loader');
    t.end();
});

test('plugin-webpack: transform: convert-node-to-resolve-fallback', (t) => {
    t.transform('convert-node-to-resolve-fallback');
    t.end();
});

test('plugin-webpack: transform: apply-externals', (t) => {
    t.transform('apply-externals');
    t.end();
});
