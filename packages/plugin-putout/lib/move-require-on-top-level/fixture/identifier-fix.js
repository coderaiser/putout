const remove = require('..');

const test = require('@putout/test')(__dirname, {
    'remove': remove,
});

test('remove debugger: report', (t) => {
    t.transform('debugger', {
        'remove': remove,
    });
    
    t.end();
});
