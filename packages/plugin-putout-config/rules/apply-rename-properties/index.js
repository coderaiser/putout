export const report = () => `Use 'createRenameProperties()' instead of 'createRenameProperty()'`;

export const replace = () => ({
    'export const __object = createRenameProperty(__a)': 'export const __object = renameProperties(__a)',
});
