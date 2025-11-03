test('putout: group-imports-by-source: no report after transform: sort-imports-by-specifiers-couple', (t) => {
    t.noReport('sort-imports-by-specifiers-couple', [
        ['sort-imports-by-specifiers', sortImportsBySpecifiers],
    ]);
    t.end();
});
