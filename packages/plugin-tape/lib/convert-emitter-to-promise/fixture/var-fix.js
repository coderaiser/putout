const {once} = require('events');

test('hello world', async (t) => {
    const hello = 'world';
    await once(emitter, 'end');
    t.end();
});
