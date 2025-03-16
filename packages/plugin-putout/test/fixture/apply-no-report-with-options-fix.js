t.noReportWithOptions('rename-files-full', `Rename '/hello/README.md' to '/hello/abc/_README.md'`, {
    from: ['/'],
    to: [],
});

t.noReport('rename-files-full', `Rename '/hello/README.md' to '/hello/abc/_README.md'`);
