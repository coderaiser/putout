test('hello world', (t) => {
    emitter.on('progress', (progress) => {
        t.equal(progress, 100);
        t.end();
    });
});

