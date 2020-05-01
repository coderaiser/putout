const {
    once
} = require('events');

test('hello world', (t) => {
    emitter.on('error', (e) => {
        t.equal(e.message, 'hello');
        t.end();
    });
});

