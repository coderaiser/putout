import {createTest} from '@putout/test';
import * as convertQueryLoaderToUse from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['webpack/convert-query-loader-to-use', convertQueryLoaderToUse],
    ],
});

test('plugin-webpack: convert-query-loader-to-use: report: query', (t) => {
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
