test('formatter: codeframea', (t) => {
    t.format(codeframe, 1);
     t.end();
});

test('formatter: codeframea', (t) => {
    t.format(codeframe, 1);
});

test('formatter: dump: many', (t) => {
    t.formatMany(dump, ['var', 'var']);
    t.end();
});

test('formatter: codeframe: no', async (t) => {
    t.noFormat(codeframe, 'no');
    t.end();
});
