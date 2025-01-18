'use strict';

const {createTest} = require('@putout/test');
const convertLoaderToUse = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['webpack/convert-loader-to-use', convertLoaderToUse],
    ],
});

test('plugin-webpack: convert-loader-to-use: report: loader', (t) => {
    t.report('loader', `"use" should be used instead of exclamation mark in loaders`);
    t.end();
});

test('plugin-webpack: convert-loader-to-use: transform: loader', (t) => {
    t.transform('loader');
    t.end();
});

test('plugin-webpack: convert-loader-to-use: no transform: query', (t) => {
    t.noTransform('query');
    t.end();
});
