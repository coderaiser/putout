'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert', plugin],
    ],
});

test('filesystem: convert: report', (t) => {
    t.report('convert', `Convert '*.js' to '*.json'`);
    t.end();
});

test('filesystem: convert: transform', (t) => {
    t.transform('convert');
    t.end();
});

test('filesystem: convert: transform: cjs', (t) => {
    t.transform('cjs');
    t.end();
});
