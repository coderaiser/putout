const isSimple = createTypeChecker([
    '-: -> SpreadElement',
    '-: -> Identifier',
    '-: -> !CallExpression',
]);

const isSimpleAfterObject = createTypeChecker([
    ['-', isSimple],
    ['-', callWithNext(isObjectExpression)],
    ['-', callWithPrev(isObjectExpression)],
]);
