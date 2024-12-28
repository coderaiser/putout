import {createTest} from '@putout/test';
import conditions from '@putout/plugin-conditions';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['types', plugin],
    ],
});

test('plugin-minify: types: report', (t) => {
    t.report('types', `Use minified types`);
    t.end();
});

test('plugin-minify: types: transform', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-minify: types: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-minify: types: transform: array-from', (t) => {
    t.transform('array-from');
    t.end();
});

test('plugin-minify: types: transform: binary-expressions', (t) => {
    t.transform('binary-expressions', {
        conditions,
    });
    t.end();
});

test('plugin-minify: types: no transform: not-defined', (t) => {
    t.noTransform('not-defined');
    t.end();
});

test('plugin-minify: types: no report: object', (t) => {
    t.noReport('object');
    t.end();
});

test('plugin-minify: types: transform: not-identifier', (t) => {
    t.transform('not-identifier');
    t.end();
});
