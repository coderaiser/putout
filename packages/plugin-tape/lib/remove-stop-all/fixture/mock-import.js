test('test: remove', (t) => {
    mockImport('hello', {});
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

