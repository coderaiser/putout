test('test: remove', (t) => {
    mockImport('fs/promises', {
        readFile,
    });
    
    t.equal(result, expected);
    t.equal(result, expected);
    t.equal(result, expected);
    t.equal(result, expected);
    t.end();
});

