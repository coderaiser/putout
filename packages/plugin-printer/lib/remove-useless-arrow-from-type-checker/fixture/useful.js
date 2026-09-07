const isTopCall = createTypeChecker([
    '-: -> !CallExpression',
    '+: parentPathReturnStatement',
    '+: parentPathExpressionStatement',
]);

const isPathGet = createTypeChecker([
    ['-: 0 -> !CallExpression'],
    ['-: 0.name -> !', '=', 'get'],
    ['+: 0.args ->', '=', 1],
]);

