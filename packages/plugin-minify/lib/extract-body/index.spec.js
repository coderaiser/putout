'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['extract-body', plugin],
    ],
});

test('plugin-minify: extract-body: report', (t) => {
    t.report('extract-body', `Avoid blocks with one statement`);
    t.end();
});

test('plugin-minify: extract-body: transform', (t) => {
    t.transform('extract-body');
    t.end();
});

test('plugin-minify: extract-body: no transform: arrow-if', (t) => {
    t.noTransform('arrow-if');
    t.end();
});

test('plugin-minify: extract-body: no transform: try', (t) => {
    t.noTransform('try');
    t.end();
});

test('plugin-minify: extract-body: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});
