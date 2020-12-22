test('some test', (t) => {
    t.throws(copymitter, /from should be a string!/, 'should throw when no args');
    t.end();
});

test('some test', (t) => {
    const fn = () => copymitter('hello');
    
    t.throws(fn, /from should be a string!/, 'should throw when no args');
    t.end();
});
