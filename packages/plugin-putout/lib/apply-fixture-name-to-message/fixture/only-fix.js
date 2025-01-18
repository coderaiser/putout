test.only('flatlint: add-missing-semicolon: no report: hello-world', (t) => {
    t.noReport('hello-world');
    t.end();
});
