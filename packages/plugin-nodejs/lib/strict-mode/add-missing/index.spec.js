import {createTest} from '@putout/test';
import * as declare from '@putout/plugin-declare';
import * as putout from '@putout/plugin-putout';
import * as convertEsmToCommonjs from '@putout/plugin-nodejs/convert-esm-to-commonjs';
import * as nodejs from '../../index.js';
import * as add from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['strict-mode/add', add],
    ],
});

test('plugin-nodejs: strict-mode: add: report: commonjs', (t) => {
    t.report('commonjs', [`Add missing 'use strict' directive on top of CommonJS`]);
    t.end();
});

test('plugin-nodejs: strict-mode: add: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: add: strict', (t) => {
    t.noTransform('strict');
    t.end();
});

test('plugin-strict-mode: add: import', (t) => {
    t.noTransform('import');
    t.end();
});

test('plugin-strict-mode: add: no transform: flow', (t) => {
    t.noTransform('flow');
    t.end();
});

test('plugin-strict-mode: add: no transform: export-all', (t) => {
    t.noTransform('export-all');
    t.end();
});

test('plugin-strict-mode: add: no transform: top-level-await', (t) => {
    t.noTransform('top-level-await');
    t.end();
});

test('plugin-strict-mode: add: no report: no-export', (t) => {
    t.noReport('no-export');
    t.end();
});

test('plugin-strict-mode: add: module-exports', (t) => {
    t.transform('module-exports');
    t.end();
});

test('plugin-strict-mode: add: require', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-strict-mode: add: await', (t) => {
    t.noTransform('await');
    t.end();
});

test('plugin-strict-mode: add-missing: putout', (t) => {
    t.noReportAfterTransform('putout', {
        putout,
        convertEsmToCommonjs,
    });
    t.end();
});

const testNodejs = createTest(import.meta.url, {
    plugins: [
        ['strict-mode/add', add],
    ],
});

testNodejs('plugin-strict-mode: add: nodejs', (t) => {
    t.transform('nodejs', {
        nodejs,
        declare,
    });
    t.end();
});
