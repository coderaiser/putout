'use strict';

const {operator} = require('putout');
const declare = require('@putout/plugin-declare');
const tape = require('@putout/plugin-tape');
const {createTest} = require('@putout/test');

const mergeDebugger = require('..');

const {remove} = operator;
const noop = () => {};

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['merge-duplicate-imports', mergeDebugger],
    ],
});

test('merge duplicate imports: report', (t) => {
    t.report('duplicate', 'Avoid duplicate imports');
    t.end();
});

test('merge duplicate imports: transform', (t) => {
    t.transform('duplicate');
    t.end();
});

test('merge duplicate imports: transform: couple-defaults', (t) => {
    t.transform('couple-defaults');
    t.end();
});

test('merge duplicate imports: transform: tape: declare', (t) => {
    t.transform('tape', {
        'tape/declare': tape.rules.declare,
    });
    t.end();
});

test('merge duplicate imports: no transform: a couple defaultImportSpecifiers', (t) => {
    t.noTransform('couple-same-defaults');
    t.end();
});

test('merge duplicate imports: no transform: namespace', (t) => {
    t.noTransform('namespace');
    t.end();
});

test('merge duplicate imports: transform: declare', (t) => {
    t.transform('declare', {
        declare,
    });
    t.end();
});

test('merge duplicate imports: transform: remove', (t) => {
    t.transform('remove', {
        remove: {
            report: noop,
            include: () => ['ImportDeclaration'],
            fix: (path) => remove(path),
        },
    });
    t.end();
});

test('merge duplicate imports: transform: nested', (t) => {
    t.transform('remove-replace', {
        remove: {
            report: noop,
            match: () => ({
                'import __imports from "react"': ({__imports}) => __imports[0].local.name === 'React',
            }),
            replace: () => ({
                'import React from "react"': '',
                'import __imports from "react"': () => '',
            }),
        },
    });
    t.end();
});
