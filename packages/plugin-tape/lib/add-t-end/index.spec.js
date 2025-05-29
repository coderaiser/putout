import {createTest} from '@putout/test';
import * as putout from '@putout/plugin-putout';
import * as addTEnd from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/add-t-end', addTEnd],
    ],
});

test('plugin-tape: add-t-end: report: t-end', (t) => {
    t.report('t-end', `'t.end()' is missing at the end of the test`);
    t.end();
});

test('plugin-tape: add-t-end: transform: t-end', (t) => {
    t.transform('t-end');
    t.end();
});

test('plugin-tape: add-t-end: transform: not-empty', (t) => {
    t.transform('not-empty');
    t.end();
});

test('plugin-tape: add-t-end: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-tape: add-t-end: no transform: async-operator', (t) => {
    t.noTransform('async-operator');
    t.end();
});

test('plugin-tape: add-t-end: transform: putout', (t) => {
    t.transform('putout', {
        putout,
    });
    t.end();
});

test('plugin-tape: add-t-end: transform: contains', (t) => {
    t.transform('contains');
    t.end();
});

test('plugin-tape: add-t-end: no report: callback', (t) => {
    t.noReport('callback');
    t.end();
});

test('plugin-tape: add-t-end: no report: assign', (t) => {
    t.noReport('assign');
    t.end();
});
