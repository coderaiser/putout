'use strict';

module.exports.report = () => 'Empty pattern';

module.exports.match = () => ({
    'const __array = __': ({__array}) => {
        const {elements} = __array;
        return !elements.find(Boolean);
    },
});

module.exports.replace = () => ({
    'const __array = __': '',
    'const {} = __': '',
    '([]) => __a': '() => __a',
    '({}) => __a': '() => __a',
});

