const isNextToAssignmentCall = createTypeChecker([
    '-: node.expression -> AssignmentExpression',
    ['+', getNext(isCallInsideExpression)],
]);

const isCallInsideExpression = createTypeChecker([
    '-: -> !ExpressionStatement',
    '+: node.expression -> CallExpression',
]);
