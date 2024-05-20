test('eslint-config: array-bracket-spacing', async ({}) => {
    await noProcess('array-bracket-spacing');
});

test.skip('eslint-config: array-bracket-spacing', async ({}) => {
    await noProcess('array-bracket-spacing');
});

test.only('eslint-config: array-bracket-spacing', async () => {
    await noProcess('array-bracket-spacing');
});
