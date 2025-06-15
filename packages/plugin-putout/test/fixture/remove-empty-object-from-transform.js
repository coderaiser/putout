test('hello', (t) => {
    t.transform('nested-labels', {});
});

test('world', (t) => {
    t.transform('nested-labels', {
        declare,
    });
});

t.transform('nested-labels', {});