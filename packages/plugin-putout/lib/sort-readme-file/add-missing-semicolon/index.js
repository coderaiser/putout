export const report = () => `Add missing semicolon`;

export const replace = () => ({
    'li("✅ ", link(__b, __c))': 'li("✅ ", link(__b, __c), ";")',
});
