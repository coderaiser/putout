import {createTest} from '@putout/test';
import * as convertWebpackToRspack from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-webpack-to-rspack', convertWebpackToRspack],
    ],
});

test('putout: plugin-convert-webpack-to-rspack: transform: apply-rspack-import', (t) => {
    t.transform('apply-rspack-import');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: transform: apply-swc-loader', (t) => {
    t.transform('apply-swc-loader');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: transform: apply-asset-type', (t) => {
    t.transform('apply-asset-type');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: transform: apply-library-object', (t) => {
    t.transform('apply-library-object');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: transform: remove-webpackbar', (t) => {
    t.transform('remove-webpackbar');
    t.end();
});
