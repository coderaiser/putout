import {operator} from 'putout';
import * as declare from '@putout/plugin-declare';
import * as tape from '@putout/plugin-tape';
import {createTest} from '@putout/test';
import * as convertEsmToCommonjs from '@putout/plugin-nodejs/convert-esm-to-commonjs';
import * as convertCommonjsToEsm from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as putoutPlugin from '@putout/plugin-putout';
import * as mockRequire from '@putout/codemod-mock-require';
import * as merge from './index.js';

const convertReplaceWith = putoutPlugin.rules['convert-replace-with'];
const {remove} = operator;
const noop = () => {};

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-duplicate-imports', merge],
    ],
});

test('plugin-merge-duplicate-imports: join: report: duplicate', (t) => {
    t.report('duplicate', 'Avoid duplicate imports');
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform: duplicate', (t) => {
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

test('plugin-merge-duplicate-imports: join: transform: remove-replace', (t) => {
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
        'tape/declare': mockRequire.rules.declare,
        'nodejs/convert-esm-to-commonjs': convertEsmToCommonjs,
    });
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform: duplicate-specifier', (t) => {
    t.transform('duplicate-specifier', {
        'putout/convert-replace-with': convertReplaceWith,
        'nodejs/convert-commonjs-to-esm': convertCommonjsToEsm,
    });
    t.end();
});

test('plugin-merge-duplicate-imports: join: transform: convert-commonjs-to-esm', (t) => {
    t.transform('convert-commonjs-to-esm', {
        'nodejs/convert-commonjs-to-esm': convertCommonjsToEsm,
        'putout/declare': putoutPlugin.rules.declare,
    });
    t.end();
});
