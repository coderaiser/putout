'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-types', plugin],
    ],
});

test('printer: apply-types: report', (t) => {
    t.report('apply-types', `require: ('@putout/babel') -> ('putout/babel').types`);
    t.end();
});

test('printer: apply-types: transform', (t) => {
    t.transform('apply-types');
    t.end();
});

test('printer: apply-types: no report: no pattern', (t) => {
    t.noReport('no-pattern');
    t.end();
});
