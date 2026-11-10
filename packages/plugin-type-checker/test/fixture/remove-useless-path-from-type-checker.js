const isBeforeIf = createTypeChecker([
    ['-: path.parentPath', isCoupleLines],
]);

isBeforeIf(path);

is([
    ['-: path.parentPath ->', isCoupleLines],
]);
