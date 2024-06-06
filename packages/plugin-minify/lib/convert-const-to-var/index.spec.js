import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-const-to-var', plugin],
    ],
});

test('plugin-minify: convert-const-to-var: report', (t) => {
    t.report('convert-const-to-var', `Use 'var' instead of 'const'`);
    t.end();
});

test('plugin-minify: convert-const-to-var: no report: not-identifier', (t) => {
    t.noReport('not-identifier');
    t.end();
});

test('plugin-minify: convert-const-to-var: transform', (t) => {
    t.transform('convert-const-to-var');
    t.end();
});

test('plugin-minify: convert-const-to-var: mutation', (t) => {
    t.transform('mutation');
    t.end();
});

test('plugin-minify: convert-const-to-var: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});
