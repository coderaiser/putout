const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-unchanged-zero-declarations', plugin],
    ],
});