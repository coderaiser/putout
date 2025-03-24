import {createTest} from '@putout/test';
import * as removeCheckDuplicatesFromTest from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-check-duplicates-from-test', removeCheckDuplicatesFromTest],
    ],
});

test('madrun: remove-check-duplicates-from-test: report: check-duplicates', (t) => {
    t.report('check-duplicates', 'test: "-d" can be removed, duplicates checked by default');
    t.end();
});

test('madrun: remove-check-duplicates-from-test: transform: check-duplicates', (t) => {
    t.transform('check-duplicates');
    t.end();
});

test('madrun: remove-check-duplicates-from-test: no report: no-check-duplicates', (t) => {
    t.noReport('no-check-duplicates');
    t.end();
});

test('madrun: remove-check-duplicates-from-test: no transform: no-check-duplicates', (t) => {
    t.noTransform('no-check-duplicates');
    t.end();
});
