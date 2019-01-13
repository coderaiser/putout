'use strict';

const removeDebugger = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-debugger': removeDebugger,
});

test('remove debugger: report', (t) => {
    t.reportCode('debugger', 'Unexpected "debugger" statement');
    t.end();
});

test('remove debugger: transformCode', (t) => {
    t.transformCode('debugger', '');
    t.end();
});

test('remove debugger: transform', (t) => {
    t.transformCode('debugger', '');
    t.end();
});

