import {createTest} from '@putout/test';
import * as applyAssetType from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-asset-type', applyAssetType],
    ],
});

test('putout: plugin-convert-webpack-to-rspack: apply-asset-type: report: url-loader', (t) => {
    t.report('url-loader', `Use rspack built-in 'asset' type instead of 'url-loader'`);
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-asset-type: transform: url-loader', (t) => {
    t.transform('url-loader');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-asset-type: no transform: no-url-loader', (t) => {
    t.noTransform('no-url-loader');
    t.end();
});
