test('primitive', (t) => {
    t.equal(result, 'b');
});

test('object', (t) => {
    {
        const result = result;
        const expected = {
            ast: null,
        };
        
        t.deepEqual(result, expected);
    }
});
