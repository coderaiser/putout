'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['assignment/convert-to-declaration', plugin],
    ],
});

test('putout: plugin-assignment: convert-to-declaration: report', (t) => {
    t.report('convert-to-declaration', `Declare 'a' before assignment`);
    t.end();
});

test('putout: plugin-assignment: convert-to-declaration: no report: nested', (t) => {
    t.noReport('nested');
    t.end();
});

test('putout: plugin-assignment: convert-to-declaration: no report: keyword', (t) => {
    t.noReport('keyword');
    t.end();
});

test('putout: plugin-assignment: convert-to-declaration: transform', (t) => {
    t.transform('convert-to-declaration');
    t.end();
});
