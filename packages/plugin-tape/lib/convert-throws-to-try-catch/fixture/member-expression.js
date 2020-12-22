const tryCatch = require('try-catch');

test('readjson.sync: no args', (t) => {
    t.throws(readjson.sync, /name should be string!/, 'NAME check');
    t.end();
});

