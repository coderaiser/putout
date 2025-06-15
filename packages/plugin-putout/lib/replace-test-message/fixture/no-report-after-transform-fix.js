test('compiler: convert-dec-to-hex: no report after transform', (t) => {
    t.noReportAfterTransform('convert-dec-to-hex');
    t.end();
});

test('compiler: convert-dec-to-hex: transform', (t) => {
    t.transform('convert-dec-to-hex');
    t.end();
});

test.only('fasm: extract-labeled-block: no report after transform: convert-do-while-to-jnz', (t) => {
    t.noReportAfterTransform('convert-do-while-to-jnz', {
        splitAssignAwaitWithAssignEax,
        convertDoWhileToJnz,
        convertFunctionToLabel,
    });
    t.end();
});
