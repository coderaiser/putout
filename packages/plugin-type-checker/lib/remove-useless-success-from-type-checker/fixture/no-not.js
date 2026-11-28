const isMethod = createTypeChecker([
    ['-: -> ObjectExpression'],
    ['+ -> +'],
]);

const isInverted = createTypeChecker([
    ['-: -> !+'],
    ['+ -> +'],
]);
