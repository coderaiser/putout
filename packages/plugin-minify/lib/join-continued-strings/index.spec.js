import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as types from '../types/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['join-continued-strings', plugin],
    ],
});

test('minify: join-continued-strings: report', (t) => {
    t.report('join-continued-strings', `Join continued strings`);
    t.end();
});

test('minify: join-continued-strings: no report: no-continued-strings', (t) => {
    t.noReport('no-continued-strings');
    t.end();
});

test('minify: join-continued-strings: transform', (t) => {
    t.transform('join-continued-strings');
    t.end();
});

test('minify: join-continued-strings: transform: win', (t) => {
    t.transform('win');
    t.end();
});

test('minify: join-continued-strings: transform: types', (t) => {
    t.transform('types', {
        types,
    });
    t.end();
});
