test('flatlint: convert-comma-to-semicolon: transform: export', (t) => {
    t.transform('export');
    t.end();
});
