const isSingleUse = createTypeChecker([
    ['-: node.id -> !Identifier'],
]);

isSingleUse(path);
isSingleUse(path);
isSingleUse(binding.path);
