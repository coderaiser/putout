'use strict';

module.exports.report = (path) => 'Empty pattern';

module.exports.replace = () => ({
    'const {} = __': '',
    'const [] = __': '',
    '([]) => __a': '() => __a',
    '({}) => __a': '() => __a',
});

