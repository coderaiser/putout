test('', async () => {
    await comparePlaces();
});

test('packages: rename-file-cjs-to-js: progress', (t) => {
    progress('rename-file-cjs-to-js', {
        i: 1,
        n: 1,
    });
});
