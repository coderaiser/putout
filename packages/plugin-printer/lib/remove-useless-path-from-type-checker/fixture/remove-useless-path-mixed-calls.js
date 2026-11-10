const isSingleUse = createTypeChecker([
    ['-: path.node.id -> !Identifier'],
]);

isSingleUse(path);
isSingleUse(binding);
