import {createTest} from '@putout/test';
import * as applyRspackImport from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-rspack-import', applyRspackImport],
    ],
});

test('putout: plugin-convert-webpack-to-rspack: apply-rspack-import: report: webpack-import', (t) => {
    t.report('webpack-import', `Use 'rspack' instead of 'webpack'`);
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-rspack-import: transform: webpack-import', (t) => {
    t.transform('webpack-import');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-rspack-import: no transform: no-webpack', (t) => {
    t.noTransform('no-webpack');
    t.end();
});
