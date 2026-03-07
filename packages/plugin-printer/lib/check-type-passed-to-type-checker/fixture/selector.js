export const beforeIf = createTypeChecker([
    ['+: parentPath.parentPath.parentPath', isLast],
]);
