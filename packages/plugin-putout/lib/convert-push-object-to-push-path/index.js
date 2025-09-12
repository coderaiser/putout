export const report = () => `Use 'push(__a)' instead of 'push({path: __a})'`;

export const replace = () => ({
    'push({path: __a})': 'push(__a)',
});
