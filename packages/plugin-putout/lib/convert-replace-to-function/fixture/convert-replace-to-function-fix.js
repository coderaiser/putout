module.exports.replace = () => ({
    'let __a = __b': 'const __b = __a',
});
