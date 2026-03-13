export const beforeIf = createTypeChecker([
    ['+', isInsideArray],
    ['-', isCoupleLines],
]);

export const x = create([
    ['+ -> !', isInsideArray],
    ['- parentPath ->', isCoupleLines],
]);
