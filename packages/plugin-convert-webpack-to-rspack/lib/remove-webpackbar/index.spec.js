import {createTest} from '@putout/test';
import * as removeWebpackbar from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-webpackbar', removeWebpackbar],
    ],
});

test('putout: plugin-convert-webpack-to-rspack: remove-webpackbar: report: webpackbar', (t) => {
    t.report('webpackbar', `Remove 'WebpackBar'`);
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: remove-webpackbar: transform: webpackbar', (t) => {
    t.transform('webpackbar');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: remove-webpackbar: no transform: no-webpackbar', (t) => {
    t.noTransform('no-webpackbar');
    t.end();
});
