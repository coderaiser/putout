import {createTest} from '@putout/test';
import * as addFunction from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-function', addFunction],
    ],
});

test('madrun: add function: report: string', (t) => {
    t.report('string', `Use 'function' instead of 'string' in script: 'hello'`);
    t.end();
});

test('madrun: add function: transform: string', (t) => {
    t.transform('string');
    t.end();
});

test('madrun: add function: no transform: exports', (t) => {
    t.noTransform('exports');
    t.end();
});

test('madrun: add function: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('madrun: add function: transform: no-exports', (t) => {
    t.transform('no-exports');
    t.end();
});

test('madrun: add function: transform: export-default', (t) => {
    t.transform('export-default');
    t.end();
});

test('madrun: add function: report: identifier', (t) => {
    t.report('identifier', `Use 'function' instead of 'string' in script: 'build'`);
    t.end();
});
