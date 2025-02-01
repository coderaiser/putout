test('plugin-convert-esm-to-commonjs: transform: declare', (t) => {
    t.transform('try-catch', {
        'try-catch': tryCatch,
    });
    t.end();
});
