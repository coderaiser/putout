'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-if-to-logical', plugin],
    ],
});

test('plugin-minify: convert-if-to-logical: report', (t) => {
    t.report('convert-if-to-logical', `Use 'logical expressions' instead of 'if conditions'`);
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform', (t) => {
    t.transform('convert-if-to-logical');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-minify: convert-if-to-logical: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-minify: convert-if-to-logical: transform: yield', (t) => {
    t.transform('yield');
    t.end();
});
