const isSingleMethod = createTypeChecker([
    ['-: -> !ObjectExpression'],
    ['-: node.properties.length', '!=', 1],
    ['+: node.properties.0 -> ObjectMethod'],
]);

const isString = createTypeChecker([
    '-: -> !Identifier',
    '+: -> StringLiteral',
]);

const withColon = createTypeChecker([
    ['+: -> BlockStatement'],
]);
