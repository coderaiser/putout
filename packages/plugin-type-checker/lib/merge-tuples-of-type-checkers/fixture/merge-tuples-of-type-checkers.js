export const isNewlineAfterComma = createTypeChecker([
    ['+: -> !', isObjectExpression],
    ['+: ->', isStringLiteral],
    ['+', isStringLiteral],
    ['+', 3],
    ['+', Boolean],
    '+: -> StringLiteral',
]);

export const is = create([
    ['+', Boolean],
]);
