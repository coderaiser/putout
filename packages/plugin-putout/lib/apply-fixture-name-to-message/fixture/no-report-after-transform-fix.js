test('compiler: convert-dec-to-hex: transform: hello', (t) => {
    t.noReportAfterTransform('hello');
    t.end();
});

test('compiler: convert-dec-to-hex: no report after transform: hello', (t) => {
    t.noReportAfterTransform('hello');
    t.end();
});
