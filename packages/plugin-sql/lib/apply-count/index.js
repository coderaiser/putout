export const report = () => `Use 'COUNT(*)' instead of 'COUNT(1)'`;

export const replace = () => ({
    'count(1)': `count('*')`,
});
