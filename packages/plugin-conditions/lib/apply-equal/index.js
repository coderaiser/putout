export const report = () => `Use '===' instead of '=' when return a value`;

export const replace = () => ({
    'return __a = __b': 'return __a === __b',
});
