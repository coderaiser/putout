export const report = () => `Avoid useless defineConfig()`;

export const replace = () => ({
    'defineConfig([__identifier])': '__identifier',
    'defineConfig([__identifier, {}])': '__identifier',
});
