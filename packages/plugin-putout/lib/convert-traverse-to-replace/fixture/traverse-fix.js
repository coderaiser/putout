module.exports.replace = () => ({
    'async (__a) => __b': 'async ({process}) => __b',
});
