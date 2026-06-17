export const beforeIf = createTypeChecker([
    ['+: -> !', isInsideArray],
    ['-: -> !', isIdentifier],
    ['-: parentPath ->', isCoupleLines],
]);

export const x = create([
    ['-: !', isInsideArray],
    ['-: parentPath -> !', isCoupleLines],
]);
