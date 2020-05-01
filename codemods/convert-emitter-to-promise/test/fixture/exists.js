test('file: error EACESS', async (t) => {
    const cp = copymitter(__dirname, '/', [path.basename(__filename)]);
    const [error] = await once(cp, 'error');
    
    t.equal(error.code, 'EACCES', error.message);
    cp.abort();
    
    cp.on('end', () => {
        t.end();
    });
});
