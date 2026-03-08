export const isIncreaseIndent = createTypeChecker([
    ['-: path.node.elements -> !', Boolean],
    ['+', isStringAndObject],
]);
export const isMultiLine = createTypeChecker([
    ['-', isIncreaseIndent],
    ['+', isSimpleAndNotEmptyObject],
]);
