import {createTest} from '@putout/test';
const removeDebugger = require('..');
const test = createTest(import.meta.url, {
    'remove-debugger': removeDebugger
});

test('remove debugger: report', (t) => {
    t.transform('debugger', {
        'remove-debugger': removeDebugger
    });
    t.end();
});

