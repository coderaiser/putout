export const beforeIf = createTypeChecker([
    '- : -> WrongType',
    isBlockStatement,
    ['- : ->', isBlockStatement],
]);

