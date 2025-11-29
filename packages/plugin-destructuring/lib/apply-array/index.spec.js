import {createTest} from '@putout/test';
import * as applyArray from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['destructuring/apply-array', applyArray],
    ],
});

test('plugin-destructuring: apply-array: report: assignment', (t) => {
    t.report('assignment', 'Use array destructuring');
    t.end();
});

test('plugin-destructuring: apply-array: report: variable-declarator', (t) => {
    t.report('variable-declarator', 'Use array destructuring');
    t.end();
});

test('plugin-destructuring: apply-array: transform: array: variable-declarator', (t) => {
    t.transform('variable-declarator');
    t.end();
});

test('plugin-destructuring: apply-array: transform: array: variable-declarator: let', (t) => {
    t.transform('let');
    t.end();
});

test('plugin-destructuring: apply-array: transform: array: assignment', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-destructuring: apply-array: transform: array: second', (t) => {
    t.transform('second');
    t.end();
});

test('plugin-destructuring: apply-array: transform: array: type', (t) => {
    t.transform('type');
    t.end();
});

test('plugin-destructuring: apply-array: no transform: array: nested', (t) => {
    t.noTransform('nested');
    t.end();
});

test('plugin-destructuring: apply-array: no transform: array: nested-assign', (t) => {
    t.noTransform('nested-assign');
    t.end();
});

test('plugin-destructuring: apply-array: no transform: array: object', (t) => {
    t.noTransform('object');
    t.end();
});

test('plugin-destructuring: apply-array: no transform: array: first', (t) => {
    t.noTransform('first');
    t.end();
});
