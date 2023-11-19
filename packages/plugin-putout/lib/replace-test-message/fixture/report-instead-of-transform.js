test('plugin-putout: add-push: report: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-putout: add-push: no report: couple', (t) => {
    t.transform('couple');
    t.end();
});
