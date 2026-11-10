export const beforeIf = createTypeChecker([
    '- : -> !StringLiteral',
    '- : -> BlockStatement',
    ['- : -> WrongType'],
]);

