const afterIf = createTypeChecker([
    ['+', notLastPrevVarNotNextVar],
    ['+: parentPath -> TSModuleBlock'],
]);
