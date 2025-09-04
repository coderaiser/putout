test('menu: submenu: report', (t) => {
    t.report('submenu', `Select right`, {
        submenuIndex: 1,
        insideSubmenu: true,
    });
    t.end();
});

test('menu: submenu: report', (t) => {
    t.report('submenu', `Select right`, {
        removeUnusedVariables,
    });
    t.end();
});

test('menu: submenu: report', (t) => {
    t.report('submenu', `Select right`, x);
    t.end();
});
