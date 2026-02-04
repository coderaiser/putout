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

test('putout: plugin-esm: apply-name-to-imported-file: report with options: namespace', (t) => {
    t.transformWithOptions('namespace', {
        name: 'a',
        source: './a.js',
    });
    t.end();
});
