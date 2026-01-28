import {createTest} from '@putout/test';
import * as plugin from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['arguments', plugin],
    ],
});

test('plugin-remove-useless-arguments: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-useless-arguments: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: no-declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not-defined', (t) => {
    t.noTransform('not-defined');
    t.end();
});

test('plugin-remove-useless-arguments: transform: method', (t) => {
    t.transform('method');
    t.end();
});

test('plugin-remove-useless-arguments: transform: unused', (t) => {
    t.transform('unused');
    t.end();
});

test('plugin-remove-useless-arguments: transform: apply-json-parse', (t) => {
    t.transform('apply-json-parse');
    t.end();
});

test('plugin-remove-useless-arguments: transform: apply-rest', (t) => {
    t.transform('apply-rest');
    t.end();
});

test('plugin-arguments: transform: remove-duplicate', (t) => {
    t.transform('remove-duplicate');
    t.end();
});

test('plugin-arguments: transform: convert-expression-to-arguments', (t) => {
    t.transform('convert-expression-to-arguments');
    t.end();
});
