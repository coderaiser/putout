const isBreakline = createTypeChecker([
    isNewlineBetweenSiblings,
    callWithNext(isIfStatement)
]);
