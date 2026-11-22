export const match = () => ({
    '() => [__object, __a]': ({__a}) => !isObjectExpression(__a),
});

export const replace = () => ({
    '() => [__object, __a]': '() => [__a, __object]',
});
