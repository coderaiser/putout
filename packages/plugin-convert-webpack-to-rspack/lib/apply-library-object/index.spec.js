import {createTest} from '@putout/test';
import * as applyLibraryObject from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-library-object', applyLibraryObject],
    ],
});

test('putout: plugin-convert-webpack-to-rspack: apply-library-object: report: library-target', (t) => {
    t.report('library-target', `Use 'output.library' object instead of 'libraryTarget'`);
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-library-object: transform: library-target', (t) => {
    t.transform('library-target');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-library-object: transform: library-target-no-export', (t) => {
    t.transform('library-target-no-export');
    t.end();
});

test('putout: plugin-convert-webpack-to-rspack: apply-library-object: no transform: no-library-target', (t) => {
    t.noTransform('no-library-target');
    t.end();
});
