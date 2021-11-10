test('test: remove', (t) => {
    mockRequire('hello', {});
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

