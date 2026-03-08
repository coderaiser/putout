export const isMultiLine = createTypeChecker([
    ['-', isIncreaseIndent],
    ['+', isSimpleAndNotEmptyObject],

]);

export const isIncreaseIndent = createTypeChecker([
    ['-: path.node.elements -> !', Boolean],
    ['+', isStringAndObject],
]);
