const isCallInsideArrow = createTypeChecker([
    ['-: parentPath.parentPath', isFunction],
    ['+: node.elements.length', '<', 4],
]);
