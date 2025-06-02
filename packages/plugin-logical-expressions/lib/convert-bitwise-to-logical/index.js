export const report = () => 'Avoid using logical operator as operand of bitwise operator';

export const replace = () => ({
    '__a | !__b': '__a || !__b',
    '!__a | __b': '!__a || __b',
});
