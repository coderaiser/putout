test('', (t) => {
    t.progress();
    t.end();
});

test('', async ({progress}) => {
    await progress();
});

test('', async ({progress}) => {
    progress();
});

test('', ({progress}) => {
    progress();
});

test('packages: rename-file-cjs-to-js: progress', (t) => {
    progress('rename-file-cjs-to-js', {
        i: 1,
        n: 1,
    });
});

