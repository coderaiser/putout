const isSingleUse = createTypeChecker([
    ['-: path.node.id -> !Identifier'],
]);

callWith(isSingleUse);
