export const beforeIf = createTypeChecker([
    ['+: -> !', isInsideArray],
    ['-: -> !Identifier'],
    ['-: parentPath ->', isCoupleLines],
]);

export const x = create([
    ['-: !', isInsideArray],
    ['-: parentPath -> !', isCoupleLines],
]);
