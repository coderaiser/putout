export const report = () => `Use 'module.exports' instead of 'exports'`;

export const replace = () => ({
    'exports.__a': 'module.exports.__a',
});
