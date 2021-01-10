test('hello world', (t) => {
    const hello = 'world';
    
    emitter.on('end', () => {
        t.end();
    });
});

