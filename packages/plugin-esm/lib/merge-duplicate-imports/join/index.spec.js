'use strict';

const {operator} = require('putout');
const declare = require('@putout/plugin-declare');
const tape = require('@putout/plugin-tape');
const {createTest} = require('@putout/test');
const convertEsmToCommonjs = require('@putout/plugin-nodejs/convert-esm-to-commonjs');

const merge = require('.');

const {remove} = operator;
const noop = () => {};

const test = createTest(__dirname, {
    plugins: [
        ['merge-duplicate-imports', merge],
    ],
});

test('plugin-merge-duplicate-imports: join: report', (t) => {
    t.report('duplicate', 'Avoid duplicate imports');
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform', (t) => {
    t.transform('duplicate');
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform: couple-defaults', (t) => {
    t.transform('couple-defaults');
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform: tape: declare', (t) => {
    t.transform('tape', {
        'tape/declare': tape.rules.declare,
    });
    t.end();
});

test('plugin-merge-duplicate-imports: join: no transform: couple-same-defaults', (t) => {
    t.noTransform('couple-same-defaults');
    t.end();
});

test('plugin-merge-duplicate-imports: join: no transform: namespace', (t) => {
    t.noTransform('namespace');
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform: declare', (t) => {
    t.transform('declare', {
        declare,
    });
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform: remove', (t) => {
    t.transform('remove', {
        remove: {
            report: noop,
            include: () => ['ImportDeclaration'],
            fix: (path) => remove(path),
        },
    });
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform: nested', (t) => {
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

test('plugin-merge-duplicate-imports: join: transform: convert-esm-to-commonjs', (t) => {
    t.transform('convert-esm-to-commonjs', {
        'tape/declare': tape.rules.declare,
        'nodejs/convert-esm-to-commonjs': convertEsmToCommonjs,
    });
    t.end();
});
