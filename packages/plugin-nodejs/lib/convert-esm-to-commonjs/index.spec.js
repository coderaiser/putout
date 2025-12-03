import {createRequire} from 'node:module';
import {createTest} from '@putout/test';
import * as putout from '@putout/plugin-putout';
import * as convert from './index.js';

const require = createRequire(import.meta.url);
const nodejsDeclare = require('..').rules.declare;

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/convert-esm-to-commonjs', convert],
    ],
});

test('plugin-convert-esm-to-commonjs: report: export', (t) => {
    t.report('export', `Use 'CommonJS' instead of 'ESM'`);
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export-var', (t) => {
    t.transform('export-var');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export-class', (t) => {
    t.transform('export-class');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export-default', (t) => {
    t.transform('export-default');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export-call', (t) => {
    t.transform('export-call');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: import-default', (t) => {
    t.transform('import-default');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: specifiers', (t) => {
    t.transform('specifiers');
    t.end();
});

test('plugin-convert-esm-to-commonjs: report: import-default', (t) => {
    t.report('import-default', [`Use 'CommonJS' instead of 'ESM'`]);
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: import-empty', (t) => {
    t.transform('import-empty');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: import-namespace', (t) => {
    t.transform('import-namespace');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: import-specifier', (t) => {
    t.transform('import-specifier');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export-function', (t) => {
    t.transform('export-function');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export-gen-fn', (t) => {
    t.transform('export-gen-fn');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export: export-multiple', (t) => {
    t.transform('export-multiple');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: export: no-arg', (t) => {
    t.transform('no-arg', {
        'add-path-arg-to-fix': putout.rules['add-path-arg-to-fix'],
    });
    t.end();
});

test('plugin-convert-esm-to-commonjs: transform: declare', (t) => {
    t.transform('declare', {
        'nodejs/declare': nodejsDeclare,
    });
    t.end();
});
