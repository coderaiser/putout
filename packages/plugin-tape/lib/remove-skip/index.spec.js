import {createTest} from '@putout/test';
import * as removeSkip from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/remove-skip', removeSkip],
    ],
});

test('plugin-remove-skip: report: skip', (t) => {
    t.report('skip', 'Remove "test.skip"');
    t.end();
});

test('plugin-remove-skip: transform: skip', (t) => {
    t.transform('skip');
    t.end();
});

test('plugin-remove-skip: transform: options', (t) => {
    t.transform('options');
    t.end();
});

test('plugin-remove-skip: transform: not-top-level', (t) => {
    t.transform('not-top-level');
    t.end();
});
