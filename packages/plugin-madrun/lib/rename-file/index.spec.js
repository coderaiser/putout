import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-file', plugin],
    ],
});

test('madrun: rename-file: report', (t) => {
    t.report('rename-file', `Rename 'madrun.js' to '.madrun.js'`);
    t.end();
});

test('madrun: rename-file: transform', (t) => {
    t.transform('rename-file');
    t.end();
});

test('madrun: rename-file: no report: not-near', (t) => {
    t.noReport('not-near');
    t.end();
});
