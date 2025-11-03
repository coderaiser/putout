test.only('lib: show-menu: no report: hide-menu', (t) => {
    t.noReport('no-menu');
    t.end();
});

test('menu: hide-submenu: no report: no-menu', (t) => {
    t.noReport('no-menu');
    t.end();
});

test('putout: group-imports-by-source: no report: sort-imports-by-specifiers', (t) => {
    t.noReport('sort-imports-by-specifiers-couple', [
        ['sort-imports-by-specifiers', sortImportsBySpecifiers],
    ]);
    t.end();
});
