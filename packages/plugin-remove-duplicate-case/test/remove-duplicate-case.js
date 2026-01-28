import {createTest} from '@putout/test';
import * as removeDebugger from '../lib/remove-duplicate-case.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicate-case', removeDebugger],
    ],
});

test('remove duplicate-case: report: case', (t) => {
    t.report('case', `Avoid duplicate 'case'`);
    t.end();
});

test('remove duplicate-case: transform: case', (t) => {
    t.transform('case');
    t.end();
});

test('remove duplicate-case: no transform: no-duplicate', (t) => {
    t.noTransform('no-duplicate');
    t.end();
});
