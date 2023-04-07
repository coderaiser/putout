test('formatter: codeframea', async ({format}) => {
    await format(codeframe, 1);
});

test('formatter: codeframea', async ({format}) => {
    await format(codeframe, 1);
});

test('formatter: dump: many', async ({formatMany}) => {
    await formatMany(dump, [
        'var',
        'var',
    ]);
});

test('formatter: codeframe: no', async ({noFormat}) => {
    await noFormat(codeframe, 'no');
});
