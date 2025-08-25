import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-const-to-let', plugin],
    ],
});

test('plugin-minify: convert-const-to-let: report', (t) => {
    t.report('convert-const-to-let', `Use 'let' instead of 'const'`);
    t.end();
});

test('plugin-minify: convert-const-to-let: no report: not-identifier', (t) => {
    t.noReport('not-identifier');
    t.end();
});

test('plugin-minify: convert-const-to-let: transform', (t) => {
    t.transform('convert-const-to-let');
    t.end();
});

test('plugin-minify: convert-const-to-let: mutation', (t) => {
    t.transform('mutation');
    t.end();
});

test('plugin-minify: convert-const-to-let: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});

test('plugin-minify: convert-const-to-let: no transform: for', (t) => {
    t.noTransform('for');
    t.end();
});
