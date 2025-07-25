test('bundler-fasm: apply-debug: transform', (t) => {
    t.noTransformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});

test('bundler-fasm: apply-debug: transform with options', (t) => {
    t.noTransformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});
