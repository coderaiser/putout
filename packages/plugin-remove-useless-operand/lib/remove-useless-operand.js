'use strict';

module.exports.report = () => 'Useless operand should be avoided';

module.exports.replace = () => ({
    '__a = __a + __b': '__a += __b',
    '__a = __a - __b': '__a -= __b',
    '__a = __a * __b': '__a *= __b',
    '__a = __a / __b': '__a /= __b',
    '__a = __a & __b': '__a &= __b',
    '__a = __a | __b': '__a |= __b',
    '__a = __a ^ __b': '__a ^= __b',
    '__a = __a ** __b': '__a **= __b',
});

