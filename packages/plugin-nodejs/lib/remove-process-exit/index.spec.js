'use strict';

const {createTest} = require('@putout/test');
const rmProcessExit = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-process-exit', rmProcessExit],
    ],
});

test('remove-process-exit: report: process-exit', (t) => {
    t.report('process-exit', '"process.exit" should not be used');
    t.end();
});

test('remove-process-exit: transform: process-exit', (t) => {
    t.transform('process-exit');
    t.end();
});
