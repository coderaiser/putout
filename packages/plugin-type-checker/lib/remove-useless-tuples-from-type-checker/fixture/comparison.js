const isInsideArrayTupleOfThree = createTypeChecker([
    '-: parentPath.parentPath -> !ArrayExpression',
    ['+: parentPath.parentPath.node.elements.length', '=', 3],
]);
