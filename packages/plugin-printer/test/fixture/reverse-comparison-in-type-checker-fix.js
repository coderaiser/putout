const isMoreThenMaxElementLengthInOneLine = createTypeChecker([
    ['-: node.elements.length', '>=', 2],
    ['-: node.elements.length', '<=', 2],
    ['-: node.elements.length', '<', 2],
    ['-: node.elements.length', '>', 2],
]);
