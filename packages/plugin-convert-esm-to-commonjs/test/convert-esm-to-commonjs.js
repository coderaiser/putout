'use strict';

const {createTest} = require('@putout/test');
const nodejsDeclare = require('@putout/plugin-nodejs').rules.declare;

const convert = require('..');
const test = createTest(__dirname, {
    'convert-esm-to-commonjs': convert,
});

test('plugin-convert-esm-to-commonjs: transform: report', (t) => {
    t.report('export', 'CommonJS should be used insted of ESM');
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
    t.report('import-default', ['CommonJS should be used insted of ESM']);
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
        'nodejs/declare': nodejsDeclare,
    });
    t.end();
});

