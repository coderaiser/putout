'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['promises/add-missing-async', convert],
    ],
});

test('plugin-add-missing-async: exports: report', (t) => {
    t.report('add-missing-async', `Add missing 'async'`);
    t.end();
});

test('plugin-add-missing-async: transform', (t) => {
    t.transform('add-missing-async');
    t.end();
});

test('plugin-add-missing-async: no report: block', (t) => {
    t.noReport('block');
    t.end();
});

test('plugin-add-missing-async: no report: top-level', (t) => {
    t.noReport('top-level');
    t.end();
});
