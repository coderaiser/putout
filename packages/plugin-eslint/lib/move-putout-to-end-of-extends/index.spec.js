import {createTest} from '@putout/test';
import * as movePutoutToEndOfExtends from './index.js';

const test = createTest(import.meta.url, {
    'eslint/move-putout-to-end-of-extends': movePutoutToEndOfExtends,
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: report: json', (t) => {
    t.report('json', '"putout" should be in the end of the "extends" list');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: transform: json', (t) => {
    t.transform('json');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: no transform: no-extends', (t) => {
    t.noTransform('no-extends');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: no report: only', (t) => {
    t.noReport('only');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: no transform: only', (t) => {
    t.noTransform('only');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: no transform: extends-not-array', (t) => {
    t.noTransform('extends-not-array');
    t.end();
});
