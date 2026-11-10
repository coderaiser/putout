const [error] = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+:node.callee.name', '=', 'from'],
]);
