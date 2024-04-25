'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-match-to-flat', plugin],
    ],
});

test('eslint: apply-match-to-flat: report', (t) => {
    t.report('apply-match-to-flat', `Apply 'matchToFlat()'`);
    t.end();
});

test('eslint: apply-match-to-flat: transform', (t) => {
    t.transform('apply-match-to-flat');
    t.end();
});

test('eslint: apply-match-to-flat: no report: json', (t) => {
    t.noReport('json');
    t.end();
});

test('eslint: apply-match-to-flat: no report: match', (t) => {
    t.noReport('match');
    t.end();
});

test('eslint: apply-match-to-flat: no report: no-files', (t) => {
    t.noReport('no-files');
    t.end();
});
