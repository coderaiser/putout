import {createTest} from '@putout/test';
import * as splitVariableDeclarations from '@putout/plugin-split-variable-declarations';
import * as plugin from '../lib/convert-const-to-let.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-const-to-let', plugin],
    ],
});

test('plugin-convert-const-to-let: report: const', (t) => {
    t.report('const', `Use 'let' when reassign`);
    t.end();
});

test('plugin-convert-const-to-let: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('plugin-convert-const-to-let: transform: multiple', (t) => {
    t.transform('multiple');
    t.end();
});

test('plugin-convert-const-to-let: transform: no-init', (t) => {
    t.transform('no-init');
    t.end();
});

test('plugin-convert-const-to-let: no report: first-const', (t) => {
    t.noReport('first-const');
    t.end();
});

test('plugin-convert-const-to-let: no report after transform: multiple', (t) => {
    t.noReportAfterTransform('multiple');
    t.end();
});

test('plugin-convert-const-to-let: no report: no-reassign', (t) => {
    t.noReport('no-reassign');
    t.end();
});

test('plugin-convert-const-to-let: no report: declare', (t) => {
    t.noReport('declare');
    t.end();
});

test('plugin-convert-const-to-let: no report: declare-module', (t) => {
    t.noReport('declare-module');
    t.end();
});

test('plugin-convert-const-to-let: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('plugin-convert-const-to-let: no report: const-const', (t) => {
    t.noReport('const-const');
    t.end();
});

test('plugin-convert-const-to-let: no report: no-assign', (t) => {
    t.noReport('no-assign');
    t.end();
});

test('plugin-convert-const-to-let: transform: split-variable-declarations', (t) => {
    t.transform('split-variable-declarations', {
        'split-variable-declaration': splitVariableDeclarations,
    });
    t.end();
});
