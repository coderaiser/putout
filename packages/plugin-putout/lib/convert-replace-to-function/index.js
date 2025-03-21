export const report = () => `'replace' should be a function`;

export const replace = () => ({
    'module.exports.replace = __object': 'module.exports.replace = () => __object',
});
