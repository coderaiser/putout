'use strict';

module.exports.report = () => 'Avoid using logical operator as operand of bitwise operator';

module.exports.replace = () => ({
    '__a | !__b': '__a || !__b',
    '!__a | __b': '!__a || __b',
});
