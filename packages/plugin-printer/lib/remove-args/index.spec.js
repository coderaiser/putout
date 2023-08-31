'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['printer/remove-args', declare],
    ],
});

test('rule: remove-args: transform', (t) => {
    t.report('remove-args', 'Remove useless argument');
    t.end();
});

test('rule: remove-args: no report: no-args', (t) => {
    t.noReport('no-args');
    t.end();
});

test('rule: remove-args: no report: print', (t) => {
    t.noReport('print');
    t.end();
});

test('rule: remove-args: transform: remove-args', (t) => {
    t.transform('remove-args');
    t.end();
});

test('rule: remove-args: transform: maybe', (t) => {
    t.transform('maybe');
    t.end();
});

test('rule: remove-args: transform: linebreak', (t) => {
    t.transform('linebreak');
    t.end();
});
