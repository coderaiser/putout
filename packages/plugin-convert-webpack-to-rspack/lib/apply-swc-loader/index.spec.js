import {createTest} from '@putout/test';
import * as applySwcLoader from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-swc-loader', applySwcLoader],
    ],
});

test('putout: plugin-convert-webpack-to-rspack: apply-swc-loader: report: babel-loader', (t) => {
    t.report('babel-loader', `Use 'builtin:swc-loader' instead of 'babel-loader'`);
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-swc-loader: transform: babel-loader', (t) => {
    t.transform('babel-loader');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-swc-loader: transform: babel-loader-options', (t) => {
    t.transform('babel-loader-options');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-swc-loader: no transform: no-babel-loader', (t) => {
    t.noTransform('no-babel-loader');
    t.end();
});
