import {createTest} from '@putout/test';
import * as madrun from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['madrun', madrun],
    ],
});

test('plugin-madrun: transform: madrun', (t) => {
    t.transform('madrun');
    t.end();
});

test('plugin-madrun: no transform: no-module-exports', (t) => {
    t.noTransform('no-module-exports');
    t.end();
});

test('plugin-madrun: no transform: module-exports-not-object', (t) => {
    t.noTransform('module-exports-not-object');
    t.end();
});

test('plugin-madrun: coverage', (t) => {
    t.transform('coverage');
    t.end();
});

test('plugin-madrun: set-report-lcov', (t) => {
    t.transform('set-report-lcov');
    t.end();
});

test('plugin-madrun: remove-check-duplicates', (t) => {
    t.transform('remove-check-duplicates');
    t.end();
});

test('plugin-madrun: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-madrun: transform: convert-run-to-cut-env', (t) => {
    t.transform('convert-run-to-cut-env');
    t.end();
});

test('plugin-madrun: transform: convert-cut-env-to-run', (t) => {
    t.transform('convert-cut-env-to-run');
    t.end();
});

test('plugin-madrun: transform: add-cut-env', (t) => {
    t.transform('add-cut-env');
    t.end();
});

test('plugin-madrun: transform: convert-args-to-scripts', (t) => {
    t.transform('convert-args-to-scripts');
    t.end();
});

test('plugin-madrun: transform: remove-useless-array-in-run', (t) => {
    t.transform('remove-useless-array-in-run');
    t.end();
});

test('plugin-madrun: transform: remove-useless-string-conversion', (t) => {
    t.transform('remove-useless-string-conversion');
    t.end();
});

test('plugin-madrun: transform: add-missing-quotes-to-watcher', (t) => {
    t.transform('add-missing-quotes-to-watcher');
    t.end();
});

test('plugin-madrun: transform: rename-file', (t) => {
    t.transform('rename-file');
    t.end();
});
