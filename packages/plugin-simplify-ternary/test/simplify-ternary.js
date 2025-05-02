import {createTest} from '@putout/test';
import * as simplifyTernary from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['simplify-ternary', simplifyTernary],
    ],
});

test('plugin-simplify-ternary: report: identifier', (t) => {
    t.report('identifier', 'Simplify ternary');
    t.end();
});

test('plugin-simplify-ternary: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-simplify-ternary: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-simplify-ternary: no transform: duplicate', (t) => {
    t.noTransform('duplicate');
    t.end();
});

test('plugin-simplify-ternary: transform: simple-duplicate', (t) => {
    t.transform('simple-duplicate');
    t.end();
});

test('plugin-simplify-ternary: no transform: diff', (t) => {
    t.noTransform('diff');
    t.end();
});

test('plugin-simplify-ternary: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('plugin-simplify-ternary: transform: boolean', (t) => {
    t.transform('boolean');
    t.end();
});

test('plugin-simplify-ternary: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-simplify-ternary: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-simplify-ternary: transform: distribute', (t) => {
    t.transform('distribute');
    t.end();
});
