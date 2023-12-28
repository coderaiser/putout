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