const {once} = require('events');

test('file: error EACESS', async (t) => {
    const cp = copymitter(__dirname, '/', [
        path.basename(__filename),
    ]);
    const [error] = await once(cp, 'error');
    
    t.equal(error.code, 'EACCES', error.message);
    cp.abort();
    await once(cp, 'end');
    t.end();
});
