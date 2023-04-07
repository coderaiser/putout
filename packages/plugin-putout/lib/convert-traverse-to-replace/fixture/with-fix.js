module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = () => ({
    'async (__a) => __b': 'async ({process}) => __b',
});
