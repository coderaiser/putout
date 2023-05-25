'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['mangle-names', plugin],
    ],
});

test('plugin-minify: mangle-names: report', (t) => {
    t.report('mangle-names', `Mangle name`);
    t.end();
});

test('plugin-minify: mangle-names: transform', (t) => {
    t.transform('mangle-names');
    t.end();
});

test('plugin-minify: mangle-names: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-minify: mangle-names: transform: destr', (t) => {
    t.transform('destr');
    t.end();
});
