const isWrongTuple = createTypeChecker([
    ['-: parentPath.parentPath -> !ArrayExpression'],
    ['+: parentPath.node.elements.length', '=', 3],
]);

const isWrong = createTypeChecker('-: parentPath.parentPath -> !ArrayExpression');
