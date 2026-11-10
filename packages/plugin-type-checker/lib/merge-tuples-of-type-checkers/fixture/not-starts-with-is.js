const afterIf = createTypeChecker([
    ['+', notLastPrevVarNotNextVar],
    ['+: parentPath', isTSModuleBlock],
]);

