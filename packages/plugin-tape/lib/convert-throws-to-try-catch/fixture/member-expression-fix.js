const tryCatch = require('try-catch');

test('readjson.sync: no args', (t) => {
    const [error] = tryCatch(readjson.sync);
    t.equal(error.message, 'name should be string!', 'NAME check');
    t.end();
});
