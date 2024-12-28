import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['mangle-names', plugin],
    ],
});

test('plugin-minify: mangle-names: report', (t) => {
    t.report('mangle-names', `Mangle name`);
    t.end();
});

test('plugin-minify: mangle-names: transform', (t) => {
    t.transform('mangle-names');
    t.end();
});

test('plugin-minify: mangle-names: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-minify: mangle-names: transform: destr', (t) => {
    t.transform('destr');
    t.end();
});

test('plugin-minify: mangle-names: transform: upper-scope', (t) => {
    t.transform('upper-scope');
    t.end();
});

test('plugin-minify: mangle-names: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('plugin-minify: mangle-names: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});

test('plugin-minify: mangle-names: transform: nested-overlap', (t) => {
    t.transform('nested-overlap');
    t.end();
});

test('plugin-minify: mangle-names: transform: one-char', (t) => {
    t.transform('one-char');
    t.end();
});

test('plugin-minify: mangle-names: transform: two-arguments', (t) => {
    t.transform('two-arguments');
    t.end();
});

test('plugin-minify: mangle-names: transform: undeclared', (t) => {
    t.transform('undeclared');
    t.end();
});

test('plugin-minify: mangle-names: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('plugin-minify: mangle-names: transform: mangleClassNames', (t) => {
    t.transformWithOptions('mangle-class-names', {
        mangleClassNames: false,
    });
    t.end();
});
