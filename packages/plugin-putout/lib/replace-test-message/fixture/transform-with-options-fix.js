test('bundler-fasm: apply-debug: transform with options', (t) => {
    t.transformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});
