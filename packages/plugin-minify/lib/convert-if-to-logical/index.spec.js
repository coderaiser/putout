import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-if-to-logical', plugin],
    ],
});

test('plugin-minify: convert-if-to-logical: report', (t) => {
    t.report('convert-if-to-logical', `Use 'logical expressions' instead of 'if conditions'`);
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform', (t) => {
    t.transform('convert-if-to-logical');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-minify: convert-if-to-logical: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: yield', (t) => {
    t.transform('yield');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: or', (t) => {
    t.transform('or');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: nested-or', (t) => {
    t.transform('nested-or');
    t.end();
});

test('plugin-minify: convert-if-to-logical: no transform: if-no-ternary', (t) => {
    t.noTransform('if-no-ternary');
    t.end();
});
