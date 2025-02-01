const test = require('@putout/test')(__dirname, {
    'remove-debugger': require('..'),
});

test('remove debugger: report', (t) => {
    t.transform('debugger', {
        'remove-debugger': require('..'),
    });
    t.end();
});

