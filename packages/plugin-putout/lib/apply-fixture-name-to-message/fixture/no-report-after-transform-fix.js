test('compiler: convert-dec-to-hex: transform: hello', (t) => {
    t.noReportAfterTransform('hello');
    t.end();
});
