test('test: remove', async (t) => {
    mockImport('fs/promises', {
        readFile,
    });
    
    const read = await reImport('./read.js');
    
    t.equal(result, expected);
    t.end();
});

test.only('test: remove', async (t) => {
    mockImport('fs/promises', {
        readFile,
    });
    
    const read = await reImport('./read.js');
    
    t.equal(result, expected);
    t.end();
});

test.skip('test: remove', async (t) => {
    mockImport('fs/promises', {
        readFile,
    });
    
    const read = await reImport('./read.js');
    
    t.equal(result, expected);
    t.end();
});

