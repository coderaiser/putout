const {once} = require('events');

test('hello world', async (t) => {
    await once(emitter, 'end');
    t.end();
});
