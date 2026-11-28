const isMethod = createTypeChecker([
    ['-: -> !ObjectExpression'],
    ['+: node.properties.0 -> ObjectMethod'],
]);
