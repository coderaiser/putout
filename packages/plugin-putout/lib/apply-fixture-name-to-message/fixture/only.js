test.only('flatlint: add-missing-semicolon: no report: logical', (t) => {
    t.noReport('hello-world');
    t.end();
});
