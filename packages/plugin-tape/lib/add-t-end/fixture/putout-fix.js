test('packages: rename-file-cjs-to-js: progress', async ({progress}) => {
    await progress('rename-file-cjs-to-js', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'rename-file-cjs-to-js',
    });
});
