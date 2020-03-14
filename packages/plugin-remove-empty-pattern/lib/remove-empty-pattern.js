'use strict';

module.exports.report = () => 'Empty pattern';

module.exports.replace = () => ({
    'const {} = __a': '__a',
    'const [] = __a': '__a',
    '([]) => __a': '() => __a',
    '({}) => __a': '() => __a',
});

