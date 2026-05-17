test('escover: instrument: mark: transform: delete', ({transform}) => {
    transform('delete');
});

test('escover: instrument: mark: transform: no report after transform: named-export', ({noReportAfterTransform}) => {
    noReportAfterTransform('named-export');
});
