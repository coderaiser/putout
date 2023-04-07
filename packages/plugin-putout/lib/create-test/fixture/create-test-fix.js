const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/create-test', plugin]
    ],
});
