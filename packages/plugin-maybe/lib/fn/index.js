export const report = () => `Use 'maybeFn()'`;

export const exclude = () => [
    'const maybeFn = isFn(__a) ? __a : noop',
    'const maybeFn = __',
];

export const replace = () => ({
    'isFn(__a) ? __a : noop': 'maybeFn(__a)',
});
