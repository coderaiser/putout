import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['is-esm', plugin],
    ],
});

test('lib: is-esm: report', (t) => {
    t.report('is-esm', ['ImportDeclaration', 'ExportNamedDeclaration:a', 'ExportDefaultDeclaration']);
    t.end();
});

test('lib: is-esm: transform', (t) => {
    t.transform('is-esm');
    t.end();
});

test('lib: is-esm: report: fn', (t) => {
    t.report('fn', ['ExportNamedDeclaration', 'ExportNamedDeclaration', 'ExportNamedDeclaration:s']);
    t.end();
});
