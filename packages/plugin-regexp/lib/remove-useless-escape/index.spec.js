import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-escape', plugin],
    ],
});

test('regexp: remove-useless-escape: report', (t) => {
    t.report('remove-useless-escape', `Avoid useless escape: '/[,;\\(\\)]/g' -> '/[,;()]/g'`);
    t.end();
});

test('regexp: remove-useless-escape: transform', (t) => {
    t.transform('remove-useless-escape');
    t.end();
});

test('regexp: remove-useless-escape: no report: need-escape', (t) => {
    t.noReport('need-escape');
    t.end();
});

test('regexp: remove-useless-escape: transform: colon', (t) => {
    t.transform('colon');
    t.end();
});

test('regexp: remove-useless-escape: transform: quote', (t) => {
    t.transform('quote');
    t.end();
});

test('regexp: remove-useless-escape: transform: coma', (t) => {
    t.transform('coma');
    t.end();
});

test('regexp: remove-useless-escape: transform: caret', (t) => {
    t.transform('caret');
    t.end();
});

test('regexp: remove-useless-escape: no report: slash', (t) => {
    t.noReport('slash');
    t.end();
});
