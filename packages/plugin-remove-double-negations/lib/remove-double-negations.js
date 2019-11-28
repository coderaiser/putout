'use strict';

module.exports.report = () => `Double negation should not be used in conditions`;

module.exports.replace = () => ({
    'if (!!__a) __b': 'if(__a) __b',
    '!!__a ? __b : __c': '__a ? __b : __c',
    '!!__a && __b' : '__a && __b',
});

