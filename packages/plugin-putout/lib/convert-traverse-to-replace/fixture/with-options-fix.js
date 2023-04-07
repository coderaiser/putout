module.exports.replace = ({options}) => ({
    'async (__a) => __b': 'async ({process}) => __b',
});
