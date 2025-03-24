import {createTest} from '@putout/test';
import * as strictMode from '@putout/plugin-nodejs/strict-mode';
import * as removeUnusedExpressions from '@putout/plugin-remove-unused-expressions';
import * as addRun from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-run', addRun],
    ],
});

const {'add-missing': addMissing} = strictMode.rules;

test('madrun: add run: report: no-run', (t) => {
    t.report('no-run', 'run should be declared');
    t.end();
});

test('madrun: add run: transform: no-run', (t) => {
    t.transform('no-run');
    t.end();
});

test('madrun: add run: no transform: run', (t) => {
    t.noTransform('run');
    t.end();
});

test('madrun: add run: no transform: no-run-used', (t) => {
    t.noTransform('no-run-used');
    t.end();
});

test('madrun: add run: transform: strict', (t) => {
    t.transform('strict', {
        addMissing,
        removeUnusedExpressions,
    });
    t.end();
});
