'use strict';

const {createTest} = require('@putout/test');
const convertNycToC8 = require('.');

const test = createTest(__dirname, {
    'convert-nyc-to-c8': convertNycToC8,
});

test('madrun: convert-nyc-to-c8: report', (t) => {
    t.report('coverage', 'coverage should use "c8" instead of "nyc"');
    t.end();
});

test('madrun: convert-nyc-to-c8: no report', (t) => {
    t.noReport('c8');
    t.end();
});

test('madrun: convert-nyc-to-c8: no report: no nyc', (t) => {
    t.noReport('no-nyc');
    t.end();
});

test('madrun: convert-nyc-to-c8: transform: coverage', (t) => {
    t.transform('coverage');
    t.end();
});

test('madrun: convert-nyc-to-c8: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('madrun: convert-nyc-to-c8: no transform: no nyc', (t) => {
    t.noTransform('no-coverage');
    t.end();
});
