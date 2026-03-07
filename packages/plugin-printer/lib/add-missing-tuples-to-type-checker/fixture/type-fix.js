export const beforeIf = createTypeChecker([
    ['+: -> StringLiteral'],
    ['- : ->', isBlockStatement],
    ['-', isBlockStatement],
]);
