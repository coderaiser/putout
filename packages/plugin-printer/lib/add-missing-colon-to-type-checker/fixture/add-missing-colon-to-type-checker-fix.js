export const beforeIf = createTypeChecker([
    ['+: -> !', isInsideArray],
    ['-: parentPath ->', isCoupleLines],
]);

export const x = create([
    ['+ -> !', isInsideArray],
    ['- parentPath ->', isCoupleLines],
]);
