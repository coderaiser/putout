export const report = () => `Use 📼 Supertape instead of 🃏Jest`;

export const replace = () => ({
    'it': 'test',
    'expect(__a).toEqual(__b)': 't.equal(__a, __b)',
});
