'use strict';

module.exports.report = () => 'Avoid boolean in assertions';

module.exports.replace = () => ({
    'return __a === true': 'return Boolean(__a)',
    'return __a == true': 'return Boolean(__a)',
    'const __a = __b === true': 'const __a = __b',
    'const __a = __b == true': 'const __a = __b',
    '__a = __b === true': '__a = __b === Boolean(__a)',
    '__a = __b == true': '__a = __b == Boolean(__a)',
    '__a === true': '__a',
    '__a === false': '!__a',
    '__a == true': '__a',
    '__a == false': '!__a',
    '__a !== true': '!__a',
    '__a != true': '!__a',
});
