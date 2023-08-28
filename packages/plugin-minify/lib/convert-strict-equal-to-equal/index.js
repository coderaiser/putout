export const report = () => `Use 'equal' instead of 'strict equal'`;

export const replace = () => ({
    '__a === __b': '__a == __b',
});
