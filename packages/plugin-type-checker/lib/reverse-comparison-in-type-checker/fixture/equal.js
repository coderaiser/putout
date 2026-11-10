const isMoreThenMaxElementLengthInOneLine = createTypeChecker([
    ['-: node.elements.length -> !', '=', 2],
]);
