export const report = () => `Use 'toSorted()' instead of '...sort()'`;

export const replace = () => ({
    '[...__a].sort(__b)': '__a.toSorted(__b)',
});
