const isMethod = createTypeChecker([
    ['-', isObjectExpression],
    ['+ -> +'],
]);

const isMany = createTypeChecker([
    ['-: -> !A', '-: -> !B'],
    ['+ -> +'],
]);

const isFunction = createTypeChecker([
    isObjectExpression,
    ['+ -> +'],
]);

const isNumber = createTypeChecker([
    ['-: -> !A'],
    [5],
]);
