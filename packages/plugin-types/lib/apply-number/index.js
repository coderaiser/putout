export const report = () => `Use 'Number()' instead of 'ternary expression'`;

export const replace = () => ({
    '__a ? 1 : 0': 'Number(__a)',
});
