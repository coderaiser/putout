test('test: remove', async (t) => {
    const read = await reImport('./read.js');
    
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

