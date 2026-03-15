import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['check-type-passed-to-type-checker', plugin],
    ],
});

test('printer: check-type-passed-to-type-checker: report', (t) => {
    t.report('check-type-passed-to-type-checker', `Unknown type detected: 'WrongType'`);
    t.end();
});

test('printer: check-type-passed-to-type-checker: report: type', (t) => {
    t.report('type', `Unknown type detected: 'StringLiteralx'`);
    t.end();
});

test('printer: check-type-passed-to-type-checker: report: export-declaration', (t) => {
    const message = [
        `Unknown type detected: 'ExportDeclaration'.`,
        `Use 'ExportAllDeclaration', 'ExportDefaultDeclaration', 'ExportNamedDeclaration' instead`,
    ].join(' ');
    
    t.report('export-declaration', message);
    t.end();
});

test('printer: check-type-passed-to-type-checker: no report: selector', (t) => {
    t.noReport('selector');
    t.end();
});

test('printer: check-type-passed-to-type-checker: no report: comment-block', (t) => {
    t.noReport('comment-block');
    t.end();
});

test('printer: check-type-passed-to-type-checker: no report: is', (t) => {
    t.noReport('is');
    t.end();
});

test('printer: check-type-passed-to-type-checker: no report: arrow', (t) => {
    t.noReport('arrow');
    t.end();
});

test('printer: check-type-passed-to-type-checker: no report: boolean', (t) => {
    t.noReport('boolean');
    t.end();
});
