'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['rename', plugin],
    ],
});

test('merge-duplicate-imports: rename: report', (t) => {
    t.report('rename', `Avoid duplicate imports`);
    t.end();
});

test('merge-duplicate-imports: rename: transform', (t) => {
    t.transform('rename');
    t.end();
});

test('merge-duplicate-imports: rename: no report: not-default-specifier', (t) => {
    t.noReport('not-default-specifier');
    t.end();
});
