'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-plugins-array-to-object', plugin],
    ],
});

test('eslint: convert-plugins-array-to-object: report', (t) => {
    t.report('convert-plugins-array-to-object', `Convert 'plugins' array to object`);
    t.end();
});

test('eslint: convert-plugins-array-to-object: transform', (t) => {
    t.transform('convert-plugins-array-to-object');
    t.end();
});

test('eslint: convert-plugins-array-to-object: not report: call', (t) => {
    t.noReport('call');
    t.end();
});
