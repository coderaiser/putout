test('test: remove', (t) => {
    mockRequire('fs/promises', {
        readFile,
    });
    
    t.equal(result, expected);
    t.end();
});

test.only('test: remove', (t) => {
    mockRequire('fs/promises', {
        readFile,
    });
    
    t.equal(result, expected);
    t.end();
});

test.skip('test: remove', (t) => {
    mockRequire('fs/promises', {
        readFile,
    });
    
    t.equal(result, expected);
    t.end();
});

