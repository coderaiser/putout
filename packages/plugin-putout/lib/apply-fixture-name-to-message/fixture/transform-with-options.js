test('bundler-fasm: apply-debug: transform', (t) => {
    t.transformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});
