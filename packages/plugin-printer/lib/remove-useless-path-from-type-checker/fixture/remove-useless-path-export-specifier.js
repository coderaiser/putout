const isSingleUse = createTypeChecker([
    ['-: path.node.id -> !Identifier'],
]);

export {
    isSingleUse,
};

isSingleUse(path);
