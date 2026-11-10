const isSingleUse = createTypeChecker([
    ['-: path.node.id -> !Identifier'],
]);

isSingleUse(binding.path);
