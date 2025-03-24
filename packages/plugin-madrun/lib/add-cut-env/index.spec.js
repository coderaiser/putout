import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['madrun/add-cut-env', convert],
    ],
});

test('madrun: add-cut-env: report: cut-env', (t) => {
    t.report('cut-env', `Call 'await cutEnv(script)' instead of 'script'`);
    t.end();
});

test('madrun: add-cut-env: transform: cut-env', (t) => {
    t.transform('cut-env');
    t.end();
});

test('madrun: add-cut-env: no transform: run', (t) => {
    t.noTransform('run');
    t.end();
});

test('madrun: add-cut-env: no report: no-property', (t) => {
    t.noReport('no-property');
    t.end();
});

test('madrun: add-cut-env: no report: no-export-default', (t) => {
    t.noReport('no-export-default');
    t.end();
});
