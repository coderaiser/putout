'use strict';

module.exports.report = () => {
    return `Array destructuring should be used`;
};

module.exports.exclude = () => [
    'const {__} = __[0]',
];

module.exports.replace = () => ({
    'const __a = __b[0]': 'const [__a] = __b',
    'let __a = __b[0]': 'let [__a] = __b',
    '__a = __b[0]': '[__a] = __b',
});

