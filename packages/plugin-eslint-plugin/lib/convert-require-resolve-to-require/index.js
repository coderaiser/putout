export const report = () => `Convert 'require.resolve()' to 'require()'`;

export const match = () => ({
    'require.resolve(__a)': (vars, path) => {
        return path.parentPath.isObjectProperty();
    },
});

export const replace = () => ({
    'require.resolve(__a)': 'require(__a)',
});
