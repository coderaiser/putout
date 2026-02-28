import {createTest} from '@putout/test';
import * as convert from './index.js';
import * as convertRequireToImport from '../require/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-commonjs-to-esm/exports', convert],
    ],
});

test('plugin-nodejs: convert-commonjs-to-esm: exports: report', (t) => {
    t.report('exports', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('plugin-nodejs: convert-commonjs-to-esm: exports: transform', (t) => {
    t.transform('exports');
    t.end();
});

test('plugin-nodejs: convert-commonjs-to-esm: exports: transform: exports-string', (t) => {
    t.transform('exports-string');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: named', (t) => {
    t.transform('named');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: multi', (t) => {
    t.transform('multi');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: different', (t) => {
    t.transform('different');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: no transform: no-member-expression', (t) => {
    t.noTransform('no-member-expression');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: no transform: no-exports', (t) => {
    t.noTransform('no-exports');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: no transform: sequence', (t) => {
    t.noTransform('sequence');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: import-specifier', (t) => {
    t.transform('import-specifier');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: nested-object', (t) => {
    t.transform('nested-object');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: object-literals', (t) => {
    t.transform('object-literals');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: require-export-overlap', (t) => {
    t.transform('require-export-overlap', {
        convertRequireToImport,
    });
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: no transform: reserved', (t) => {
    t.noTransform('reserved');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: no report: logical', (t) => {
    t.noReport('logical');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: no report: spread', (t) => {
    t.noReport('spread');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: object-method', (t) => {
    t.transform('object-method');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: used', (t) => {
    t.transform('used');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: same-name', (t) => {
    t.transform('same-name');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-nodejs: covert-commonjs-to-esm: exports: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});
