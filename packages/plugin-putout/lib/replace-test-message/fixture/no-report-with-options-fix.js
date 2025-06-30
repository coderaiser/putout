test('plugin-github: set node versions: no report after transform: no-version', (t) => {
    t.noReportWithOptions('intersects', {
        versions: ['24.x'],
    });
    t.end();
});
