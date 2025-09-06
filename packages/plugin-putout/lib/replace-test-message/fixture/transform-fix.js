test('plugin-putout: convert-traverse-to-include: transform', (t) => {
    t.transform('traverse');
    t.end();
});

t.transform('abc');

test((t) => {
    t.transform('traverse');
    t.end();
});

test('lib: select: transform', (t) => {
    t.transform('select');
    t.end();
});
