'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['sort-imports-by-specifiers', plugin],
    ],
});

test('putout: sort-imports-by-specifiers: report', (t) => {
    t.report('sort-imports-by-specifiers', `Sort imports by specifiers count`);
    t.end();
});

test('putout: sort-imports-by-specifiers: no report: one-import', (t) => {
    t.noReport('one-import');
    t.end();
});

test('putout: sort-imports-by-specifiers: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('putout: sort-imports-by-specifiers: transform', (t) => {
    t.transform('sort-imports-by-specifiers');
    t.end();
});
