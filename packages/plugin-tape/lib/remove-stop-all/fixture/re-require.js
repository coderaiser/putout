test('test: remove', (t) => {
    const read = reRequire('./read.js');
    
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

