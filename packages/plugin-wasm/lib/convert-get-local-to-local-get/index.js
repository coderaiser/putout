export const report = () => `Use 'local.get' instead of 'get_local'`;

export const replace = () => ({
    'get_local(__a)': 'local.get(__a)',
});
