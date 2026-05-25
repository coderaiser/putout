export const report = () => `Avoid useless 'exports = module.exports', use 'module.exports' instead`;

export const replace = () => ({
    'exports = module.exports = __a': 'module.exports = __a',
});
