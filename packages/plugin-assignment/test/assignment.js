'use strict';

const {createTest} = require('@putout/test');
const assignment = require('../lib/index.js');

const test = createTest(__dirname, {
    plugins: [
        ['assignment', assignment],
    ],
});

test('putout: plugin: assignment: convert-to-expression', (t) => {
    t.transform('convert-to-expression');
    t.end();
});

test('putout: plugin: assignment: convert-to-comparison', (t) => {
    t.transform('convert-to-comparison');
    t.end();
});

test('putout: plugin: assignment: convert-to-declaration', (t) => {
    t.transform('convert-to-declaration');
    t.end();
});

test('putout: plugin: assignment: simplify', (t) => {
    t.transform('simplify');
    t.end();
});

test('putout: plugin: assignment: split', (t) => {
    t.transform('split');
    t.end();
});
