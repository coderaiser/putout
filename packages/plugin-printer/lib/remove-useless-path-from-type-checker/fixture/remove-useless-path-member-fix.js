const isSingleUse = createTypeChecker([
    ['-: node.id -> !Identifier'],
]);

isSingleUse(binding.path);
