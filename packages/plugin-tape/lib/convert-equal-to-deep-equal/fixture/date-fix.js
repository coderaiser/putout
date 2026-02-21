test('', () => {
    const result = new Date();
    const expected = getDate();
    
    t.deepEqual(result, expected);
});

test.only('redzip: local: write: mtime', async (t) => {
    const name = join(tmpdir(), 'redzip-remove-me.txt');
    const data = 'hello';
    const innerPath = '';
    
    const mtime = new Date(1996, 1, 29);
    
    await write(name, innerPath, Readable.from(data), {
        mtime,
    });
    
    const {date} = await readStat(name, innerPath);
    
    await unlink(name);
    
    t.deepEqual(date, mtime);
    t.end();
});
