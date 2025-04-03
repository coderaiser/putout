import {createTest} from '@putout/test';
import * as maybe from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['maybe', maybe],
    ],
});

test('plugin-maybe: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-maybe: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-maybe: transform: empty-array', (t) => {
    t.transform('empty-array');
    t.end();
});

test('plugin-maybe: transform: noop', (t) => {
    t.transform('noop');
    t.end();
});

test('plugin-maybe: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});
