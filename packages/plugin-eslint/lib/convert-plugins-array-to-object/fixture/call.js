 putout('const a = 5', {
    plugins: [
        ['remove-unused-variables', require('@putout/plugin-remove-unused-variables')],
    ],
});
