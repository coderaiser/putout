'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-legacy-test-declaration', plugin],
    ],
});

test('printer: remove-legacy-test-declaration: report', (t) => {
    t.report('remove-legacy-test-declaration', `Remove legacy test declaration`);
    t.end();
});

test('printer: remove-legacy-test-declaration: transform', (t) => {
    t.transform('remove-legacy-test-declaration');
    t.end();
});

test('printer: remove-legacy-test-declaration: no report: no-require', (t) => {
    t.noReport('no-require');
    t.end();
});

test('printer: remove-legacy-test-declaration: no report: extend', (t) => {
    t.noReport('extend');
    t.end();
});

test('printer: remove-legacy-test-declaration: no report: create-test', (t) => {
    t.noReport('create-test');
    t.end();
});
