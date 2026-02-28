export const report = () => `Use 'getBinding()' instead of 'path.scope.getBinding()'`;

export const replace = () => ({
    'path.scope.getBinding(__a)': 'getBinding(path, __a)',
});
