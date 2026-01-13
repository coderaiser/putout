import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/declare', declare],
    ],
});

test('plugin-tape: declare: report: test', (t) => {
    t.report('test', `Declare 'test', it referenced but not defined`);
    t.end();
});

test('plugin-tape: declare: transform: test', (t) => {
    t.transform('test');
    t.end();
});

test('plugin-tape: declare: transform: stub', (t) => {
    t.transform('stub');
    t.end();
});

test('plugin-tape: declare: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-tape: declare: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
