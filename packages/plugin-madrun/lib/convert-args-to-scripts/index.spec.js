'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-args-to-scripts', plugin],
    ],
});

test('packages: convert-args-to-scripts: report', (t) => {
    t.report('convert-args-to-scripts', `Pass an array when you want to run a list of scripts`);
    t.end();
});

test('packages: convert-args-to-scripts: no report: one', (t) => {
    t.noReport('one');
    t.end();
});

test('packages: convert-args-to-scripts: no report: env', (t) => {
    t.noReport('env');
    t.end();
});

test('packages: convert-args-to-scripts: no report: object', (t) => {
    t.noReport('object');
    t.end();
});

test('packages: convert-args-to-scripts: no report: no-dash', (t) => {
    t.noReport('no-dash');
    t.end();
});

test('packages: convert-args-to-scripts: transform', (t) => {
    t.transform('convert-args-to-scripts');
    t.end();
});
