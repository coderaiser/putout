const isSingleUse = createTypeChecker([
    ['-: path.node.id -> !Identifier'],
]);
