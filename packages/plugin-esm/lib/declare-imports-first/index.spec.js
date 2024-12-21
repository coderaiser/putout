'use strict';

const {operator} = require('putout');
const {createTest} = require('@putout/test');
const plugin = require('.');

const {remove} = operator;

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['declare-imports-first', plugin],
    ],
});

test('putout: plugin-esm: declare-imports-first: report', (t) => {
    t.report('declare', `Declare imports first`);
    t.end();
});

test('putout: plugin-esm: declare-imports-first: transform', (t) => {
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
