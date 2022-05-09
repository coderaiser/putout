'use strict';

const {createTest} = require('@putout/test');
const convert = require('..');
const test = createTest(__dirname, {
    'convert-commonjs-to-esm': convert,
});

test('plugin-convert-commonjs-to-esm: transform: report', (t) => {
    t.report('exports', 'ESM should be used instead of CommonJS');
    t.end();
});

test('plugin-convert-commonjs-to-esm: transform: export', (t) => {
    t.transform('exports');
    t.end();
});

test('plugin-convert-commonjs-to-esm: transform: export: string', (t) => {
    t.transform('exports-string');
    t.end();
});

test('plugin-convert-commonjs-to-esm: transform: commons', (t) => {
    t.transform('commons');
    t.end();
});
