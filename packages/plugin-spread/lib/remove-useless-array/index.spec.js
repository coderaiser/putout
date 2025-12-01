import {createTest} from '@putout/test';
import * as array from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-spread/array', array],
    ],
});

test('plugin-remove-useless-spread: array: report: for-of', (t) => {
    t.report('for-of', `Avoid useless spread '...'`);
    t.end();
});

test('plugin-remove-useless-spread: array: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: call-args', (t) => {
    t.transform('call-args');
    t.end();
});

test('plugin-remove-useless-spread: array: no transform: not-call', (t) => {
    t.noTransform('not-call');
    t.end();
});

test('plugin-remove-useless-spread: array: no transform: map', (t) => {
    t.noTransform('map');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-remove-useless-spread: array: no transform: multiple', (t) => {
    t.noTransform('multiple');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: array-from', (t) => {
    t.transform('array-from');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: set', (t) => {
    t.transform('set');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: ternary', (t) => {
    t.transform('ternary');
    t.end();
});

test('plugin-remove-useless-spread: array: no transform: values', (t) => {
    t.noTransform('values');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: keys', (t) => {
    t.transform('keys');
    t.end();
});
