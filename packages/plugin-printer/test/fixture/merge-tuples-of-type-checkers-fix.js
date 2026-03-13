export const isNewlineAfterComma = createTypeChecker([
    ['+: -> !ObjectExpression'],
    ['+: -> StringLiteral'],
    ['+: StringLiteral'],
    ['+:', 3],
    ['+: -> StringLiteral'],
]);
