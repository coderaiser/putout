export const beforeIf = createTypeChecker([
    '- : -> !StringLiteral',
    '- : -> !WrongType',
    ['- : -> BlockStatement'],
    ['- : -> WrongType'],
    ['- : ->', isBlockStatement],
    ['-', isBlockStatement],
]);
