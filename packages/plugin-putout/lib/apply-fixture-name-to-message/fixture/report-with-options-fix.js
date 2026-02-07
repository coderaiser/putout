test('putout: plugin-esm: apply-name-to-imported-file: apply-named-import: report with options: dynamic', (t) => {
    t.reportWithOptions('dynamic', `'const a = await import("./a.js")' -> 'const {a} = await import("./a.js")'`, {
        name: 'a',
        source: './a.js',
    });
    t.end();
});
