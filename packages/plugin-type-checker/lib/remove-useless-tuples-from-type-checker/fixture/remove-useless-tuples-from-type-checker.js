export const beforeIf = createTypeChecker([
    '- : -> !StringLiteral',
    '- : -> BlockStatement',
    '- : -> WrongType',
    ['- : ->', isBlockStatement],
    ['-', isBlockStatement],
]);

export const allTuples = createTypeChecker([
    ['- : ->', isBlockStatement],
    ['-', isBlockStatement],
]);

export const allStrings = createTypeChecker([
    ['- : -> BlockStatement'],
    ['- : -> WrongType'],
]);

export const allIdentifiers = createTypeChecker([
    [isExpressionStatement],
]);

export const wrong = wrongFn([
    ['-', isBlockStatement],
]);

