'use strict';

const applyFilterBoolean = require('..');

const test = require('@putout/test')(__dirname, {
    'apply-filter-boolean': applyFilterBoolean,
});

test('plugin-apply-filter-boolean: transform: report', (t) => {
    t.report('array', 'Use Boolean constructor');
    t.end();
});

test('plugin-apply-filter-boolean: transform: object', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-filter-boolean: transform: find', (t) => {
    t.transform('find');
    t.end();
});

