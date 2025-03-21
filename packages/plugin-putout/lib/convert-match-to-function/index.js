export const report = () => `'match' should be a function`;

export const replace = () => ({
    'module.exports.match= __object': 'module.exports.match = () => __object',
});
