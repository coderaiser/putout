'use strict';

module.exports.report = () => 'Empty pattern';

const notOk = (a) => !a;
const check = ({__array}) => {
    const {elements} = __array;
    return elements.every(notOk);
};

module.exports.match = () => ({
    '(__array) => __a': check,
    'const __array = __': check,
});

module.exports.replace = () => ({
    'const __array = __': '',
    'const {} = __': '',
    '(__array) => __a': '() => __a',
    '({}) => __a': '() => __a',
});

