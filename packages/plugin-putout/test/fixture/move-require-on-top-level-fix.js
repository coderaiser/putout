const removeDebugger = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-debugger': removeDebugger
});

test('remove debugger: report', (t) => {
    t.transform('debugger', {
        'remove-debugger': removeDebugger
    });
    t.end();
});

