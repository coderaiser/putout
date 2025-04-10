export const report = () => `Avoid useless 'typeof'`;

export const replace = () => ({
    'typeof typeof __a': 'typeof __a',
});
