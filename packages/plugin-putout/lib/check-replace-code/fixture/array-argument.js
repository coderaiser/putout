module.exports.replace = () => ({
    '(__array) => __a': '() => __a',
    't.calledWithNoArgs(__a, __array)': 't.calledWith(__a, __array)',
});

