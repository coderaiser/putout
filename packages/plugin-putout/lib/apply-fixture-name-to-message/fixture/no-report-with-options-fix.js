test('plugin-github: set node versions: no transform: intersects', (t) => {
    t.noReportWithOptions('intersects', {
        versions: ['24.x'],
    });
    t.end();
});
