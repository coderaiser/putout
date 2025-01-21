test('putout: test: noReport', (t) => {
    const dir = join(__dirname, 'fixture');
    const plugins = [
        ['remove-import', {
            report: () => 'hello',
            include: () => ['ImportDeclaration'],
        }],
    ];
});
