'use strict';

const {createTest} = require('@putout/test');
const removeDebugger = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-debugger', removeDebugger],
    ],
});

test('remove debugger: report', (t) => {
    t.reportCode('debugger', `Unexpected 'debugger' statement`);
    t.end();
});

test('remove debugger: transformCode', (t) => {
    t.transformCode('debugger', '\n');
    t.end();
});
