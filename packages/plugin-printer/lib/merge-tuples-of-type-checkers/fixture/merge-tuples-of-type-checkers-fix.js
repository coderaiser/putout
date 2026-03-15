export const isNewlineAfterComma = createTypeChecker([
    ['+: -> !ObjectExpression'],
    ['+: -> StringLiteral'],
    ['+: StringLiteral'],
    ['+', 3],
    ['+ -> +'],
    '+: -> StringLiteral',
]);

export const is = create([
    ['+', Boolean],
]);
