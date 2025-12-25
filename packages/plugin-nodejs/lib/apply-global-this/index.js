export const report = () => `Use 'globalThis' instead of 'global'`;

export const replace = () => ({
    'global.__a': 'globalThis.__a',
    'const __a = global': 'const __a = globalThis',
});
