import {createTest} from '@putout/test';
import * as putoutConfig from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout-config', putoutConfig],
    ],
});

test('plugin-putout-config: transform: apply-conditions', (t) => {
    t.transform('apply-conditions');
    t.end();
});

test('plugin-putout-config: transform: apply-esm', (t) => {
    t.transform('apply-esm');
    t.end();
});

test('plugin-putout-config: transform: apply-parens', (t) => {
    t.transform('apply-parens');
    t.end();
});

test('plugin-putout-config: transform: apply-return', (t) => {
    t.transform('apply-return');
    t.end();
});

test('plugin-putout-config: transform: apply-optional-chaining', (t) => {
    t.transform('apply-optional-chaining');
    t.end();
});

test('plugin-putout-config: transform: apply-for-of', (t) => {
    t.transform('apply-for-of');
    t.end();
});

test('plugin-putout-config: transform: apply-labels', (t) => {
    t.transform('apply-labels');
    t.end();
});

test('plugin-putout-config: transform: apply-math', (t) => {
    t.transform('apply-math');
    t.end();
});

test('plugin-putout-config: transform: apply-nodejs', (t) => {
    t.transform('apply-nodejs');
    t.end();
});

test('plugin-putout-config: transform: apply-promises', (t) => {
    t.transform('apply-promises');
    t.end();
});

test('plugin-putout-config: transform: apply-tape', (t) => {
    t.transform('apply-tape');
    t.end();
});

test('plugin-putout-config: transform: apply-types', (t) => {
    t.transform('apply-types');
    t.end();
});

test('plugin-putout-config: transform: convert-boolean-to-string', (t) => {
    t.transform('convert-boolean-to-string');
    t.end();
});

test('plugin-putout-config: transform: rename-rules', (t) => {
    t.transform('rename-rules');
    t.end();
});

test('plugin-putout-config: transform: remove-empty', (t) => {
    t.transform('remove-empty');
    t.end();
});

test('plugin-putout-config: transform: move-formatter-up', (t) => {
    t.transform('move-formatter-up');
    t.end();
});

test('plugin-putout-config: transform: apply-destructuring', (t) => {
    t.transform('apply-destructuring');
    t.end();
});

test('plugin-putout-config: transform: apply-arguments', (t) => {
    t.transform('apply-arguments');
    t.end();
});

test('plugin-putout-config: transform: apply-spread', (t) => {
    t.transform('apply-spread');
    t.end();
});

test('plugin-putout-config: transform: apply-variables', (t) => {
    t.transform('apply-variables');
    t.end();
});

test('plugin-putout-config: no transform: remove-empty-file', (t) => {
    t.noTransform('remove-empty-file');
    t.end();
});

test('plugin-putout-config: transform: sort-ignore', (t) => {
    t.transform('sort-ignore');
    t.end();
});
