'use strict';

const convert = require('..');
const test = require('@putout/test')(__dirname, {
    'convert-esm-to-commonjs': convert,
});

test('plugin-convert-esm-to-commonjs: transform: report', (t) => {
    t.report('export', 'Commonjs should be used insted of ESM');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export var', (t) => {
    t.transform('export-var');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export class', (t) => {
    t.transform('export-class');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export default', (t) => {
    t.transform('export-default');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export call', (t) => {
    t.transform('export-call');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: import default', (t) => {
    t.transform('import-default');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: specifiers', (t) => {
    t.transform('specifiers');
    t.end();
});

test('plugin-convert-esm-to-commonjs: report: import default', (t) => {
    t.report('import-default', ['Commonjs should be used insted of ESM']);
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: import empty', (t) => {
    t.transform('import-empty');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: import namespace', (t) => {
    t.transform('import-namespace');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: import specifier', (t) => {
    t.transform('import-specifier');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export function', (t) => {
    t.transform('export-function');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: declare', (t) => {
    t.transform('declare', {
        'declare-undefinded-variables': require('@putout/plugin-declare-undefined-variables'),
    });
    t.end();
});

