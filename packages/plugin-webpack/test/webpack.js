import {createTest} from '@putout/test';
import * as webpack from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['webpack', webpack],
    ],
});

test('plugin-webpack: transform: loader', (t) => {
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
