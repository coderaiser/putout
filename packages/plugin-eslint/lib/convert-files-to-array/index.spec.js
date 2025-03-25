import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-files-to-array', plugin],
    ],
});

test('eslint: convert-files-to-array: report', (t) => {
    t.report('convert-files-to-array', `Convert 'files' to an array to simplify migrating to FlatConfig`);
    t.end();
});

test('eslint: convert-files-to-array: report: flat', (t) => {
    t.report('flat', `Convert 'files' to an array, this is the only type support by FlatConfig`);
    t.end();
});

test('eslint: convert-files-to-array: transform', (t) => {
    t.transform('convert-files-to-array');
    t.end();
});

test('eslint: convert-files-to-array: transform: flat', (t) => {
    t.transform('flat');
    t.end();
});

test('eslint: convert-files-to-array: report: config', (t) => {
    t.report('config', [`Convert 'files' to an array to simplify migrating to FlatConfig`]);
    t.end();
});
