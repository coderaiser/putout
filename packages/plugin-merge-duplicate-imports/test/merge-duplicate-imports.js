'use strict';

const {operator} = require('putout');
const declareUndefinedVariables = require('@putout/plugin-declare-undefined-variables');

const {createTest} = require('@putout/test');
const {declare} = require('@putout/plugin-tape').rules;

const mergeDebugger = require('..');

const {remove} = operator;
const test = createTest(__dirname, {
    'merge-duplicate-imports': mergeDebugger,
});

test('merge duplicate imports: report', (t) => {
    t.report('duplicate', 'Avoid duplicate imports');
    t.end();
});

test('merge duplicate imports: transform', (t) => {
    t.transform('duplicate');
    t.end();
});

test('merge duplicate imports: transform: tape: declare', (t) => {
    t.transform('tape', {
        'tape/declare': declare,
    });
    t.end();
});

test('merge duplicate imports: no transform: a couple defaultImportSpecifiers', (t) => {
    t.noTransform('couple-defaults');
    t.end();
});

test('merge duplicate imports: no transform: namespace', (t) => {
    t.noTransform('namespace');
    t.end();
});

test('merge duplicate imports: transform: declare', (t) => {
    t.transform('declare', {
        'declare-undefined-variables': declareUndefinedVariables,
    });
    t.end();
});

test('merge duplicate imports: transform: remove', (t) => {
    t.transform('remove', {
        remove: {
            report: () => {},
            include: () => ['ImportDeclaration'],
            fix: (path) => remove(path),
        },
    });
    t.end();
});

