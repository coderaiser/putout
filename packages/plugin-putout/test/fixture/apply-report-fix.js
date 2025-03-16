t.noReportWithOptons('rename-files-full', {
    from: ['/'],
    to: [],
});

t.noReport('rename-files-full');

t.noReport('a');
t.noReport('a');
