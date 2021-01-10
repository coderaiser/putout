test('hello world', (t) => {
    emitter.on('end', () => {
        t.end();
    });
});

