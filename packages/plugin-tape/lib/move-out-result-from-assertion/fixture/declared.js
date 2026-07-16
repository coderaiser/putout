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


test('protectFromLoops: code with loop: returns code with guard injected', (t) => {
    const result = protect('for(let i=0;i<10;i++){}');
    
    t.ok(result.includes('Infinite loop detected on line'));
    t.end();
});

