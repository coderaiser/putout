export const beforeIf = createTypeChecker([
    ['-: parentPath', isCoupleLines],
]);

is([
    ['-: path.parentPath ->', isCoupleLines],
]);
