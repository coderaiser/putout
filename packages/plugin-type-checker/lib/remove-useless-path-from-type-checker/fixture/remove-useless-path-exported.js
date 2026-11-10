export const isSingleUse = createTypeChecker([
    ['-: path.node.id -> !Identifier'],
]);

isSingleUse(path);
