import {createTest} from '@putout/test';
import * as mergeDestructuringProperties from '@putout/plugin-merge-destructuring-properties';
import * as declare from '@putout/plugin-declare';
import * as minify from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['minify', minify],
    ],
});

test('plugin-minify: transform: apply-ternary', (t) => {
    t.transform('apply-ternary');
    t.end();
});

test('plugin-minify: transform: apply-template-literal', (t) => {
    t.transform('apply-template-literal');
    t.end();
});

test('plugin-minify: transform: convert-if-to-logical', (t) => {
    t.transform('convert-if-to-logical');
    t.end();
});

test('plugin-minify: transform: convert-strict-equal-to-equal', (t) => {
    t.transform('convert-strict-equal-to-equal');
    t.end();
});

test('plugin-minify: transform: extract-body', (t) => {
    t.transform('extract-body');
    t.end();
});

test('plugin-minify: transform: expand-bindings', (t) => {
    t.transform('expand-bindings');
    t.end();
});

test('plugin-minify: transform: remove-var-undefined', (t) => {
    t.transform('remove-var-undefined');
    t.end();
});

test('plugin-minify: transform: remove-return-undefined', (t) => {
    t.transform('remove-return-undefined');
    t.end();
});

test('plugin-minify: transform: mangle-names', (t) => {
    t.transform('mangle-names');
    t.end();
});

test('plugin-minify: transform: merge-variables', (t) => {
    t.transform('merge-variables');
    t.end();
});

test('plugin-minify: transform: shorten-names', (t) => {
    t.transform('shorten-names');
    t.end();
});

test('plugin-minify: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-minify: transform: inline', (t) => {
    t.transform('inline');
    t.end();
});

test('plugin-minify: transform: simplify-floor', (t) => {
    t.transform('simplify-floor');
    t.end();
});

test('plugin-minify: transform: convert-const-to-let', (t) => {
    t.transform('convert-const-to-let');
    t.end();
});

test('plugin-minify: transform: convert-const-to-var: convert-const-to-let-overlap', (t) => {
    t.transform('convert-const-to-let-overlap');
    t.end();
});

test('plugin-minify: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('plugin-minify: transform: mutation', (t) => {
    t.transform('mutation');
    t.end();
});

test('plugin-minify: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-minify: transform: if-no-ternary', (t) => {
    t.transform('if-no-ternary');
    t.end();
});

test('plugin-minify: transform: merge-loops', (t) => {
    t.transform('merge-loops');
    t.end();
});

test('plugin-minify: transform: class', (t) => {
    t.transform('class');
    t.end();
});

test('plugin-minify: transform: var', (t) => {
    t.transform('var');
    t.end();
});

test('plugin-minify: transform: join-continued-strings', (t) => {
    t.transform('join-continued-strings');
    t.end();
});

test('plugin-minify: transform: convert-return-to-sequence-expression', (t) => {
    t.transform('convert-return-to-sequence-expression');
    t.end();
});

test('plugin-minify: transform: before-init', (t) => {
    t.transform('before-init');
    t.end();
});

test('plugin-minify: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});

test('plugin-minify: transform: merge-assignment-expressions', (t) => {
    t.transform('merge-assignment-expressions');
    t.end();
});

test('plugin-minify: transform: merge-destructuring-properties', (t) => {
    t.transform('merge-destructuring-properties', {
        declare,
        mergeDestructuringProperties,
    });
    t.end();
});

test('plugin-minify: transform: convert-let-to-var-inside-label', (t) => {
    t.transform('convert-let-to-var-inside-label');
    t.end();
});
