export const report = () => `Use 'global' instead of 'namespace' in 'declare'`;

export const replace = () => ({
    'declare namespace global {__body}': 'declare global {__body}',
});
