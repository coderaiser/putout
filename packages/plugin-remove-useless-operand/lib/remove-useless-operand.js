'use strict';

module.exports.report = () => 'Useless operand should be avoided';

module.exports.replace = () => ({
    '__a += 1': '++__a',
    '__a -= 1': '--__a',
    '__a = __a + __b': '__a += __b',
    '__a = __a - __b': '__a -= __b',
    '__a = __a * __b': '__a *= __b',
    '__a = __a / __b': '__a /= __b',
    '__a = __a & __b': '__a &= __b',
    '__a = __a | __b': '__a |= __b',
    '__a = __a ^ __b': '__a ^= __b',
    '__a = __a ** __b': '__a **= __b',
});

