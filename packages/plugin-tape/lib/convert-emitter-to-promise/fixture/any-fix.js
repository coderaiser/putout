const {once} = require('events');

test('hello world', async (t) => {
    const [progress] = await once(emitter, 'progress');
    t.equal(progress, 100);
    t.end();
});
