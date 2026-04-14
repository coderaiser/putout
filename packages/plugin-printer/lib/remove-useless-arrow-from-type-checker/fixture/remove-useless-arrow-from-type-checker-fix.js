const isTwoLongStringsInsideArray = createTypeChecker([
    ['-: -> !', isTwoLongStrings],
    ['+: parentPath -> ArrayExpression'],
]);
