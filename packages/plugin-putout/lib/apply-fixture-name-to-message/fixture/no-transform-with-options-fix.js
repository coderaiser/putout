test('bundler-fasm: apply-debug: transform: apply-debug-options', (t) => {
    t.noTransformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});
