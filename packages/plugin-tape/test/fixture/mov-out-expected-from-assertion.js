test('primitive', (t) => {
    t.equal(result, 'b');
});

test('object', (t) => {
    t.deepEqual(result, {
        ast: null,
    });
});
