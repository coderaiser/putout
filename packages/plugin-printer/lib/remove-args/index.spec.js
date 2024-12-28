'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['printer/remove-args', declare],
    ],
});

test('plugin-printer: remove-args: report', (t) => {
    t.report('remove-args', 'Remove useless argument');
    t.end();
});

test('plugin-printer: remove-args: no report: no-args', (t) => {
    t.noReport('no-args');
    t.end();
});

test('plugin-printer: remove-args: no report: print', (t) => {
    t.noReport('print');
    t.end();
});

test('plugin-printer: remove-args: transform: remove-args', (t) => {
    t.transform('remove-args');
    t.end();
});

test('plugin-printer: remove-args: transform: maybe', (t) => {
    t.transform('maybe');
    t.end();
});

test('plugin-printer: remove-args: transform: linebreak', (t) => {
    t.transform('linebreak');
    t.end();
});

test('plugin-printer: remove-args: transform: breakline', (t) => {
    t.transform('breakline');
    t.end();
});
