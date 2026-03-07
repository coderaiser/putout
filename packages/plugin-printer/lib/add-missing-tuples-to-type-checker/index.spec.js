import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-tuples-to-type-checker', plugin],
    ],
});

test('printer: add-missing-tuples-to-type-checker: report', (t) => {
    t.report('add-missing-tuples-to-type-checker', `Add missing tuple around: '- : -> !StringLiteral'`);
    t.end();
});

test('printer: add-missing-tuples-to-type-checker: transform', (t) => {
    t.transform('add-missing-tuples-to-type-checker');
    t.end();
});

test('printer: add-missing-tuples-to-type-checker: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

test('printer: add-missing-tuples-to-type-checker: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('printer: add-missing-tuples-to-type-checker: no report: not-type-checker', (t) => {
    t.noReport('not-type-checker');
    t.end();
});

test('printer: add-missing-tuples-to-type-checker: no report: mixed', (t) => {
    t.noReport('mixed');
    t.end();
});

test('printer: add-missing-tuples-to-type-checker: no report: strings', (t) => {
    t.noReport('strings');
    t.end();
});
