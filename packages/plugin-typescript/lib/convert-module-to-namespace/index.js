export const report = () => `Use 'namespace' instead of 'module'`;

export const replace = () => ({
    'declare module __identifier {__body}': 'declare namespace __identifier {__body}',
    'module __identifier {__body}': 'namespace __identifier {__body}',
});
