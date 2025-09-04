t.transformWithOptions('submenu', {
    submenuIndex: 1,
    insideSubmenu: true,
});

t.transform('submenu', {
    submenuIndex,
    insideSubmenu,
});

t.transform('submenu', {});
