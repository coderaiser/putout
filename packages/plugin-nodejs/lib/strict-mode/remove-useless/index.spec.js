import {createTest} from '@putout/test';
import * as typescript from '@putout/plugin-typescript';
import * as putout from '@putout/plugin-putout';
import * as nodejs from '@putout/plugin-nodejs';
import * as remove from './index.js';

const convertEsmToCommonjs = nodejs.rules['convert-esm-to-commonjs'];

const test = createTest(import.meta.url, {
    plugins: [
        ['strict-mode/remove', remove],
    ],
});

test('plugin-nodejs: strict-mode: remove: report: esm', (t) => {
    t.report('esm', `Avoid 'use strict' in ESM`);
    t.end();
});

test('plugin-nodejs: strict-mode: remove: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('plugin-nodejs: strict-mode: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-nodejs: strict-mode: remove: export-all', (t) => {
    t.transform('export-all');
    t.end();
});

test('plugin-nodejs: strict-mode: remove: transform: top-level-await', (t) => {
    t.transform('top-level-await');
    t.end();
});

test('plugin-nodejs: strict-mode: remove: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-nodejs: strict-mode: remove: transform: couple-esm', (t) => {
    t.transform('couple-esm');
    t.end();
});

test('plugin-nodejs: strict-mode: remove: no transform: use-client', (t) => {
    t.noTransform('use-client');
    t.end();
});

test('plugin-nodejs: strict-mode: remove: no transform: import-expression', (t) => {
    t.noTransform('import-expression');
    t.end();
});

test('plugin-nodejs: strict-mode: remove: transform: typescript', (t) => {
    t.transform('typescript', {
        typescript,
    });
    t.end();
});

test('plugin-nodejs: strict-mode: remove: transform: expression', (t) => {
    t.transform('expression', {
        putout,
        convertEsmToCommonjs,
        nodejs,
    });
    t.end();
});
