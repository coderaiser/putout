const isCallInsideExpression = createTypeChecker([
    '-: -> !ExpressionStatement',
    '+: node.expression -> CallExpression',
]);
const isNextToAssignmentCall = createTypeChecker([
    '-: node.expression -> AssignmentExpression',
    ['+', getNext(isCallInsideExpression)],
]);
