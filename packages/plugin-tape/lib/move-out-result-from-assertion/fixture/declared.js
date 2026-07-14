test('expected', (t) => {
    const result = 3;
    const expected = 5;
    
    t.notEqual(result, {
        getItem,
    });
});

test('result', (t) => {
    const result = 3;
    const expected = 5;
    
    t.notEqual(typeof result, expected);
});

