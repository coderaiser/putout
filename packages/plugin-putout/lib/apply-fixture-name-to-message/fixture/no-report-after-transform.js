test('compiler: convert-dec-to-hex: transform', (t) => {
    t.noReportAfterTransform('hello');
    t.end();
});

test('compiler: convert-dec-to-hex: no report after transform', (t) => {
    t.noReportAfterTransform('hello');
    t.end();
});
