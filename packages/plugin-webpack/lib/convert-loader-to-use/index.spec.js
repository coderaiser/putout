'use strict';

const convertLoaderToUse = require('.');

const test = require('@putout/test')(__dirname, {
    'webpack/convert-loader-to-use': convertLoaderToUse,
});

test('plugin-webpack: convert-loader-to-use: report', (t) => {
    t.report('loader', `"use" should be used instead of exclamation mark in loaders`);
    t.end();
});

test('plugin-webpack: convert-loader-to-use: transform', (t) => {
    t.transform('loader');
    t.end();
});

test('plugin-webpack: convert-loader-to-use: no transform: query', (t) => {
    t.noTransform('query');
    t.end();
});

