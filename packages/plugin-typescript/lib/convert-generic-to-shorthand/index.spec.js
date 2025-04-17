import {createTest} from '@putout/test';
import * as convertGenericToShorthand from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/convert-generic-to-shorthand', convertGenericToShorthand],
    ],
});

test('plugin-typescript: convert-generic-to-shorthand: report: array', (t) => {
    t.report('array', `Use shorthand '[]' instead of generic 'Array'`);
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: transform: multiple', (t) => {
    t.transform('multiple');
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: no transform: no-generic', (t) => {
    t.noTransform('no-generic');
    t.end();
});
