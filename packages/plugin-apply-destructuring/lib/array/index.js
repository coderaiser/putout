export const report = () => `Use array destructuring`;

export const exclude = () => [
    'const __object = __[0]',
    'const __array = __[0]',
    '({__} = __[0])',
    '[__] = __[0]',
    '__a[0] = __b[0]',
];

export const replace = () => ({
    '__a = __b[0]': '[__a] = __b',
    '__a = __b[1]': '[, __a] = __b',
    'const __a = __b[0]': convertTo('const [__a] = __b'),
    'let __a = __b[0]': convertTo('let [__a] = __b'),
});

const convertTo = (template) => ({__a}) => {
    delete __a.typeAnnotation;
    return template;
};
