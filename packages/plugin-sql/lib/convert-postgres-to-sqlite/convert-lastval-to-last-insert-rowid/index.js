export const report = () => `Use 'lastInsertRowid' instead of 'lastval'`;

export const replace = () => ({
    'select(lastval())': 'select(lastInsertRowid())',
});
