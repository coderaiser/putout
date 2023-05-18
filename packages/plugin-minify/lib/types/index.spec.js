'use strict';

const {createTest} = require('@putout/test');
const conditions = require('@putout/plugin-conditions');

const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['types', plugin],
    ],
});

test('plugin-minify: types: report', (t) => {
    t.report('types', `Use minified types`);
    t.end();
});

test('plugin-minify: types: transform', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-minify: types: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-minify: types: transform: binary-expressions', (t) => {
    t.transform('binary-expressions', {
        conditions,
    });
    t.end();
});
