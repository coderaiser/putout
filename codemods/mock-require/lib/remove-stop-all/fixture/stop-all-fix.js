test('test: remove', (t) => {
    t.equal(result, expected);
    t.end();
});

test.only('test: remove', (t) => {
    t.equal(result, expected);
    t.end();
});

test.skip('test: remove', (t) => {
    t.equal(result, expected);
    t.end();
});
