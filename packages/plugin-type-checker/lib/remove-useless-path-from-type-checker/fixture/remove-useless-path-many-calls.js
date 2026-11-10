const isSingleUse = createTypeChecker([
    ['-: path.node.id -> !Identifier'],
]);

isSingleUse(path);
isSingleUse(path);
isSingleUse(binding.path);
