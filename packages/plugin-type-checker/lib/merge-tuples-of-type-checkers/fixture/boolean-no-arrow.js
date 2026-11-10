const isInsideIfWithElse = createTypeChecker([
    ['-: parentPath -> !IfStatement'],
    ['+: parentPath.node.alternate', Boolean],
]);

