'use strict';

const {createTest} = require('@putout/test');
const removeDebugger = require('..');
const test = createTest(__dirname, {
    'remove-debugger': removeDebugger,
});

test('remove-unused-variables: report', (t) => {
    t.reportCode('const a = 5', `'a' is defined but never used`);
    t.end();
});

