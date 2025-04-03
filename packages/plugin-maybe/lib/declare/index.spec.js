import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['maybe/declare', declare],
    ],
});

test('plugin-maybe: declare: report', (t) => {
    t.report('declare', `Declare 'maybeArray', it referenced but not defined`);
    t.end();
});

test('plugin-maybe: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-maybe: declare: transform: maybe-first', (t) => {
    t.transform('maybe-first');
    t.end();
});

test('plugin-maybe: declare: transform: maybe-call', (t) => {
    t.transform('maybe-call');
    t.end();
});
