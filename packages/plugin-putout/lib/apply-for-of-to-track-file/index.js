export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const replace = () => ({
    'trackFile(__a, __b).map(push)': 'for (const file of trackFile( __a, __b)) {push(file)}',
});
