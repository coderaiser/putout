module.exports.replace = () => ({
    'const __array = __' : '',
});

module.exports.replace = () => ({
    'module.exports.include = __array': 'module.exports.include = () => __array',
});

export const replace = () => ({
    'export const include = __array': 'export const include = () => __array',
});
