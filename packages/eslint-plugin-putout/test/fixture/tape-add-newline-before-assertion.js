test('lint: do some check', (t) => {
    const result = 1 + 2;
    t.equal(result, 3);
    t.end();
});

test.only('lint: do some check', (t) => {
    const result = 1 + 2;
    t.equal(result, 3);
    t.end();
});

test.skip('lint: do some check', (t) => {
    const result = 1 + 2;
    t.equal(result, 3);
    t.end();
});
