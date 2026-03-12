export const isNewlineAfterComma = createTypeChecker([
    ['+: -> !ObjectExpression'],
    ['+: -> StringLiteral'],
    ['+: StringLiteral'],
    ['+', 3],
    ['+', Boolean],
    '+: -> StringLiteral',
]);

export const is = create([
    ['+', Boolean],
]);
