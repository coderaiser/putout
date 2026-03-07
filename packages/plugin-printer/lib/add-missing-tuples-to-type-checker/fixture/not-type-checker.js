export const beforeIf = fn([
    '- : -> WrongType',
    isBlockStatement,
    ['- : ->', isBlockStatement],
]);

