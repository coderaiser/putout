'use strict';

const test = require('@putout/test')(__dirname, {
    'webpack/convert-query-loader-to-use': require('.'),
});

test('plugin-webpack: convert-query-loader-to-use: report', (t) => {
    t.report('query', `"use" should be used instead of query in loaders`);
    t.end();
});

test('plugin-webpack: convert-query-loader-to-use: transform: query', (t) => {
    t.transform('query');
    t.end();
});

test('plugin-webpack: convert-query-loader-to-use: transform: couple-queries', (t) => {
    t.transform('couple-queries');
    t.end();
});

