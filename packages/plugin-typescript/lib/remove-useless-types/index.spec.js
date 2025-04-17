import {createTest} from '@putout/test';
import * as removeUselessTypes from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/remove-useless-types', removeUselessTypes],
    ],
});

test('typescript: remove useless types: report: types', (t) => {
    t.report('types', 'Avoid useless type declaration');
    t.end();
});

test('typescript: remove useless types: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('typescript: remove useless types: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('typescript: remove useless types: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('typescript: remove useless types: no transform: generic', (t) => {
    t.noTransform('generic');
    t.end();
});

test('typescript: remove useless types: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('typescript: remove useless types: no transform: qualified-name', (t) => {
    t.noTransform('qualified-name');
    t.end();
});
