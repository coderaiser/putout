test('plugin-convert-esm-to-commonjs: transform: try-catch', (t) => {
    t.transform('try-catch', {
        'try-catch': tryCatch,
    });
    t.end();
});
