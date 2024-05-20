test('eslint-config: array-bracket-spacing', async ({progress}) => {
    await progress({
        i: 1,
        n: 1,
    });
});

test.skip('eslint-config: array-bracket-spacing', async ({progress}) => {
    await progress({});
});

test.only('eslint-config: array-bracket-spacing', async ({progress}) => {
    await progress({});
});
