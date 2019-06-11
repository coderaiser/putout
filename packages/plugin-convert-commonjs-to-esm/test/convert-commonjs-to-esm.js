'use strict';

const convert = require('..');
const test = require('@putout/test')(__dirname, {
    'convert-commonjs-to-esm': convert,
});

test('plugin-convert-esm-to-commonjs: transform: report', (t) => {
    t.report('exports', 'ESM should be used insted of Commonjs');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export', (t) => {
    t.transform('exports');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export: string', (t) => {
    t.transform('exports-string');
    t.end();
});

