export const replace = () => ({
    'module __identifier {__body}': 'declare namespace __identifier {__body}',
    'declare module __identifier__a {__body}': 'declare namespace __identifier__a {__body}',
    'module __identifier__a {__body}': 'namespace __identifier__a {__body}',
});
