module.exports.replace = () => ({
    'const __object = __' : '',
    'module.exports.replace = __object': 'module.exports.replace = () => __object',
});

