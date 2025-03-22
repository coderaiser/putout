import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-commonjs-to-esm/exports', convert],
    ],
});

test('plugin-convert-commonjs-to-esm: exports: report', (t) => {
    t.report('exports', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: transform', (t) => {
    t.transform('exports');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: transform: exports-string', (t) => {
    t.transform('exports-string');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: transform: named', (t) => {
    t.transform('named');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: transform: multi', (t) => {
    t.transform('multi');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: transform: different', (t) => {
    t.transform('different');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: no transform: no-member-expression', (t) => {
    t.noTransform('no-member-expression');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: no transform: no-exports', (t) => {
    t.noTransform('no-exports');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: no transform: sequence', (t) => {
    t.noTransform('sequence');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: transform: import-specifier', (t) => {
    t.transform('import-specifier');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

test('plugin-convert-commonjs-to-esm: exports: no transform: reserved', (t) => {
    t.noTransform('reserved');
    t.end();
});
