'use strict';

const {operator} = require('putout');
const {createTest} = require('@putout/test');

const nodejs = require('@putout/plugin-nodejs');
const plugin = require('.');

const convertEsmToCommonjs = nodejs.rules['convert-esm-to-commonjs'];

const {remove} = operator;

const test = createTest(__dirname, {
    plugins: [
        ['declare-imports-first', plugin],
    ],
});

test('putout: plugin-esm: declare-imports-first: report: declare', (t) => {
    t.report('declare', `Declare imports first`);
    t.end();
});

test('putout: plugin-esm: declare-imports-first: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('putout: plugin-esm: declare-imports-first: transform: export-from', (t) => {
    t.transform('export-from');
    t.end();
});

test('putout: plugin-esm: declare-imports-first: no report: no-vars', (t) => {
    t.noReport('no-vars');
    t.end();
});

test('putout: plugin-esm: declare-imports-first: transform: export-star', (t) => {
    t.transform('export-star');
    t.end();
});

test('putout: plugin-esm: declare-imports-first: transform: remove', (t) => {
    t.transform('remove', {
        remove: {
            report: () => '',
            include: () => ['ImportDeclaration'],
            fix: (path) => remove(path),
        },
    });
    t.end();
});

test('putout: plugin-esm: declare-imports-first: transform: convert-esm-to-commonjs', (t) => {
    t.transform('convert-esm-to-commonjs', {
        'convert-esm-to-commonjs': convertEsmToCommonjs,
    });
    t.end();
});
