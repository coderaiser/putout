'use strict';

const {createTest} = require('@putout/test');
const rmProcessExit = require('..');
const test = createTest(__dirname, {
    'remove-process-exit': rmProcessExit,
});

test('remove-process-exit: report', (t) => {
    t.report('process-exit', '"process.exit" should not be used');
    t.end();
});

test('remove-process-exit: transform', (t) => {
    t.transform('process-exit');
    t.end();
});

