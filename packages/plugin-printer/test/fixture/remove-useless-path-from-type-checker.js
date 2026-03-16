export const beforeIf = createTypeChecker([
    ['-: path.parentPath -> ', isCoupleLines],
]);


is([
    ['-: path.parentPath -> ', isCoupleLines],
]);