test('bundler-fasm: apply-debug: transform', (t) => {
    t.transformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});

test('bundler-fasm: apply-debug: no transform with options', (t) => {
    t.transformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});
