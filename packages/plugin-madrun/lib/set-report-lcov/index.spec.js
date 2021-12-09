'use strict';

const setReportLcov = require('.');

const test = require('@putout/test')(__dirname, {
    'set-report-lcov': setReportLcov,
});

test('madrun: set-report-lcov: report', (t) => {
    t.report('report', 'Report should use "lcov" instead of "text-lcov"');
    t.end();
});

test('madrun: set-report-lcov: transform: report', (t) => {
    t.transform('report');
    t.end();
});

test('madrun: set-report-lcov: no report', (t) => {
    t.noReport('no-report');
    t.end();
});

