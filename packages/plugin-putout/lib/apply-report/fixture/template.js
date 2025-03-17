test('edit: rename-files-full: no report: equal', (t) => {
    t.noReport('rename-files-full', `Rename '/hello/README.md' to '/hello/abc/_README.md'`);
    t.end();
});
