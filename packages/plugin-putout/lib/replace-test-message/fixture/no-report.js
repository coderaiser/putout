test.only('lib: show-menu: transform with options: hide-menu', (t) => {
    t.noReport('no-menu');
    t.end();
});

test('menu: hide-submenu: no report with options: no-menu', (t) => {
    t.noReport('no-menu');
    t.end();
});


test('putout: group-imports-by-source: no report after transform: sort-imports-by-specifiers', (t) => {
    t.noReport('sort-imports-by-specifiers-couple', [
        ['sort-imports-by-specifiers', sortImportsBySpecifiers],
    ]);
    t.end();
});
