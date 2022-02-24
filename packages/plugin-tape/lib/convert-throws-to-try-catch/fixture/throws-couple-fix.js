test('some test', (t) => {
    const [error] = tryCatch(copymitter);
    t.equal(error.message, 'from should be a string!', 'should throw when no args');
    t.end();
});

test('some test', (t) => {
    const fn = () => copymitter('hello');

    const [error] = tryCatch(fn);

    t.equal(error.message, 'from should be a string!', 'should throw when no args');
    t.end();
});
