export const report = () => `Pass 'options' in second argument`;

export const replace = () => ({
    'test(__a, __b, __object)': 'test(__a, __object, __b)',
});
