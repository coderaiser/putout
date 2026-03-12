export const isNewlineAfterComma = createTypeChecker([
    ['+: -> !', isObjectExpression],
    ['+: ->', isStringLiteral],
    ['+', isStringLiteral],
    ['+', 3],
    '+: -> StringLiteral',
]);