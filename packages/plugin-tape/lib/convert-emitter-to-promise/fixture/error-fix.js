const {once} = require('events');

test('hello world', async (t) => {
    const [e] = await once(emitter, 'error');
    t.equal(e.message, 'hello');
    t.end();
});
