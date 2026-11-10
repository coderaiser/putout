const isBeforeIf = createTypeChecker([
    ['-: parentPath', isCoupleLines],
]);

isBeforeIf(path);

is([
    ['-: path.parentPath ->', isCoupleLines],
]);
