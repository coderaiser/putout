const testDeclare = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-types', plugin],
        ['declare-before-reference', declareBeforeReference],
        ['remove-nested-blocks', removeNestedBlocks],
    ],
});

testDeclare.only('printer: apply-types: no report: declare-before-reference', (t) => {
    t.noReportAfterTransform('declare-before-reference');
    t.end();
});
