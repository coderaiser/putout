import {createTest} from '@putout/test';
import * as cutUselessFunctions from '../lib/cut-useless-functions.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['cut-useless-functions', cutUselessFunctions],
    ],
});

test('cut useless functions: report', (t) => {
    t.report('block', 'Useless functions should be avoided');
    t.end();
});

test('cut useless functions: transform: block', (t) => {
    t.transform('block');
    t.end();
});

test('cut useless functions: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('cut useless functions: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});

test('cut useless functions: no transform: method block', (t) => {
    t.noTransform('method-block');
    t.end();
});

test('cut useless functions: no transform: different args', (t) => {
    t.noTransform('different-args');
    t.end();
});

test('cut useless functions: transform: curry', (t) => {
    t.transform('curry');
    t.end();
});

test('cut useless functions: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('cut useless functions: no transform: identifier: block', (t) => {
    t.noTransform('identifier-block');
    t.end();
});

test('cut useless functions: no transform: regexp', (t) => {
    t.noTransform('regexp');
    t.end();
});

test('cut useless functions: transform: call', (t) => {
    t.transform('call');
    t.end();
});
