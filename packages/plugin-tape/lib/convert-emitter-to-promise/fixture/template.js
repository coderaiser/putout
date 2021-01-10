test('hello world', (t) => {
    emitter.on(`progress`, () => {
        t.equal(progress, 100);
        t.end();
    });
});

