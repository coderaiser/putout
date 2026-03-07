const isSpaceAfterComa = createTypeChecker([
    callWithNext(isSimpleBetweenObjects),
    '+: -> !ObjectExpression',
]);
