import {createTest} from '@putout/test';
import * as removeEmptyArgument from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-argument', removeEmptyArgument],
    ],
});

test('plugin-remove-empty: argument: report: arg', (t) => {
    t.report('arg', 'Avoid empty destructuring argument');
    t.end();
});

test('plugin-remove-empty: transform: argument: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-empty: transform: argument: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-remove-empty: transform: argument: object-method', (t) => {
    t.transform('object-method');
    t.end();
});

test('plugin-remove-empty: transform: argument: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('plugin-remove-empty: transform: argument: assign-array', (t) => {
    t.transform('assign-array');
    t.end();
});
