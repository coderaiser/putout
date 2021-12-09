const test = require('@putout/test')(__dirname, {
    remove: require('..'),
});

test('remove debugger: report', (t) => {
    t.transform('debugger', {
        remove: require('..'),
    });
    t.end();
});

