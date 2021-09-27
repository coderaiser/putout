test('test: remove', (t) => {
    mockImport('fs/promises', {
        readFile,
    });

    stopAll();

    t.equal(result, expected);
    t.end();
});

