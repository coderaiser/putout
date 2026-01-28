import {createTest} from '@putout/test';
import * as plugin from '../lib/convert-object-entries-to-array-entries.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-object-entries-to-array-entries', plugin],
    ],
});

test('plugin-convert-object-entries-to-array-entries: report: convert-object-entries-to-array-entries', (t) => {
    t.report('convert-object-entries-to-array-entries', `Use 'array.entries()' instead of 'Object.entries()'`);
    t.end();
});

test('plugin-convert-object-entries-to-array-entries: transform: convert-object-entries-to-array-entries', (t) => {
    t.transform('convert-object-entries-to-array-entries');
    t.end();
});

test('plugin-convert-object-entries-to-array-entries: no transform: not-equal', (t) => {
    t.noTransform('not-equal');
    t.end();
});

test('plugin-convert-object-entries-to-array-entries: no transform: not-index', (t) => {
    t.noTransform('not-index');
    t.end();
});

test('plugin-convert-object-entries-to-array-entries: no transform: no-operation', (t) => {
    t.noTransform('no-operation');
    t.end();
});

test('plugin-convert-object-entries-to-array-entries: transform: declared', (t) => {
    t.transform('declared');
    t.end();
});
