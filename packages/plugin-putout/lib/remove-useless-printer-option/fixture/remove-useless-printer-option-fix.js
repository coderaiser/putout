const test = createTest(__dirname, {
    plugins: [
        ['remove-unchanged-zero-declarations', plugin],
    ],
});
