test('test: remove', (t) => {
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test.only('test: remove', (t) => {
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test.skip('test: remove', (t) => {
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

