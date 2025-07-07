test('bundler-fasm: apply-debug: transform: apply-debug-options', (t) => {
    t.transformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});
