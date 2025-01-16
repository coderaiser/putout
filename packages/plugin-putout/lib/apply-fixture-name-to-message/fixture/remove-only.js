test.only('flatlint: convert-comma-to-semicolon: transform', (t) => {
    t.transform('export');
    t.end();
});
