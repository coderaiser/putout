export const report = () => `Avoid useless defineConfig()`;

export const replace = () => ({
    'export default defineConfig([__identifier])': 'export default __identifier',
    'export default defineConfig([__identifier, {}])': 'export default __identifier',
});
