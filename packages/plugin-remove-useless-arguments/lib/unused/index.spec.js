'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['unused', plugin],
    ],
});

test('remove-useless-arguments: unused: report', (t) => {
    t.report('unused', `Avoid useless argument: 'member'`);
    t.end();
});

test('remove-useless-arguments: unused: transform', (t) => {
    t.transform('unused');
    t.end();
});

test('remove-useless-arguments: unused: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('remove-useless-arguments: unused: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('remove-useless-arguments: unused: no report: no-references', (t) => {
    t.noReport('no-references');
    t.end();
});

test('remove-useless-arguments: unused: no report: destructuring', (t) => {
    t.noReport('destructuring');
    t.end();
});

test('remove-useless-arguments: unused: no report: no-declaration', (t) => {
    t.noReport('no-declaration');
    t.end();
});

test('remove-useless-arguments: unused: no report: not-object', (t) => {
    t.noReport('not-object');
    t.end();
});

test('remove-useless-arguments: unused: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('remove-useless-arguments: unused: transform: anonymous', (t) => {
    t.transform('anonymous');
    t.end();
});
