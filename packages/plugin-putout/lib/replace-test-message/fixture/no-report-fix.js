test.only('lib: show-menu: no report: hide-menu', (t) => {
    t.noReport('no-menu');
    t.end();
});

test('menu: hide-submenu: no report: no-menu', (t) => {
    t.noReport('no-menu');
    t.end();
});
