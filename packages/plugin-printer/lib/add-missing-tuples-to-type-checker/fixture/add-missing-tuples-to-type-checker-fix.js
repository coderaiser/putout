export const beforeIf = createTypeChecker([
    ['- : -> !StringLiteral'],
    ['- : -> BlockStatement'],
    ['- : -> WrongType'],
    ['- : ->', isBlockStatement],
    ['-', isBlockStatement],
]);

export const allTuples = createTypeChecker([
    ['- : ->', isBlockStatement],
    ['-', isBlockStatement],
]);

export const allIdentifiers = createTypeChecker([
    isExpressionStatement,
]);

export const allStrings = createTypeChecker([
    '- : -> BlockStatement',
    '- : -> WrongType',
]);
