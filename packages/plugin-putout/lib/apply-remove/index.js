export const report = () => `Use 'remove(path)' instead of 'path.remove()'`;

export const replace = () => ({
    '__a.remove()': 'remove(__a)',
});
