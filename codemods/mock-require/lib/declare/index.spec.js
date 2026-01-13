import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['mock-require/declare', declare],
    ],
});

test('plugin-mock-require: declare: report: test', (t) => {
    t.report('test', `Declare 'test', it referenced but not defined`);
    t.end();
});

test('plugin-mock-require: declare: transform: test', (t) => {
    t.transform('test');
    t.end();
});

test('plugin-mock-require: declare: transform: stub', (t) => {
    t.transform('stub');
    t.end();
});

test('plugin-mock-require: declare: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-mock-require: declare: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('putout-mock-require: declare: transform: mock-import', (t) => {
    t.transform('mock-import');
    t.end();
});

test('plugin-mock-require: declare: transform: re-import', (t) => {
    t.transform('re-import');
    t.end();
});

test('plugin-mock-require: declare: transform: stop-all: stop-all-esm', (t) => {
    t.transform('stop-all-esm');
    t.end();
});

test('plugin-mock-require: declare: transform: stop-all: stop-all-commonjs', (t) => {
    t.transform('stop-all-commonjs');
    t.end();
});

test('plugin-mock-require: declare: transform: re-require', (t) => {
    t.transform('re-require');
    t.end();
});
