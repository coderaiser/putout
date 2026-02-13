import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['simplify-ternary/value', plugin],
    ],
});

test('plugin-simplify-ternary: value: report: ternary', (t) => {
    t.report('ternary', 'Simplify ternary');
    t.end();
});

test('plugin-simplify-ternary: value: transform: ternary', (t) => {
    t.transform('ternary');
    t.end();
});

test('plugin-simplify-ternary: value: transform: optional', (t) => {
    t.transform('optional');
    t.end();
});

test('plugin-simplify-ternary: value: false', (t) => {
    t.transform('false');
    t.end();
});

test('plugin-simplify-ternary: value: is-undefined', (t) => {
    t.transform('is-undefined');
    t.end();
});

test('plugin-simplify-ternary: value: is-fn', (t) => {
    t.transform('is-fn');
    t.end();
});

test('plugin-simplify-ternary: value: return', (t) => {
    t.noTransform('return');
    t.end();
});

test('plugin-simplify-ternary: value: no transform: jsx', (t) => {
    t.noTransform('jsx');
    t.end();
});
