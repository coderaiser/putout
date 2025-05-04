test('plugin-putout: check-replace-code: no report: hello', (t) => {
    t.noReport('typescript', [
        ['plugin', plugin],
    ]);
    t.end();
});
