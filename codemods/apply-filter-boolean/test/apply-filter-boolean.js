'use strict';

const {createTest} = require('@putout/test');

const applyFilterBoolean = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-filter-boolean', applyFilterBoolean],
    ],
});

test('plugin-apply-filter-boolean: transform: report', (t) => {
    t.report('array', 'Use Boolean constructor');
    t.end();
});

test('plugin-apply-filter-boolean: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-filter-boolean: transform: find', (t) => {
    t.transform('find');
    t.end();
});
