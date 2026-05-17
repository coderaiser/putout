test('escover: instrument: mark: transform: abc', ({transform}) => {
    transform('delete');
});

test('escover: instrument: mark: transform: no report after transform: abc', ({noReportAfterTransform}) => {
    noReportAfterTransform('named-export');
});

