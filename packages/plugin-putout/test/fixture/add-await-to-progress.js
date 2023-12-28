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

test('', async (t) => {
    await t.progress();
    t.end();
});

test('packages: rename-file-cjs-to-js: progress', (t) => {
    t.progress('rename-file-cjs-to-js', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'rename-file-cjs-to-js',
    });
    t.end();
});
