t.noReport('rename-files-full', {
    from: ['/'],
    to: [],
});

t.noReportWithOptions('rename-files-full');

t.noReport('a', 'Use b');
t.report('a');