'use strict';

module.exports.report = () => '"true" and "false" has no sense in logical expressions';

module.exports.replace = () => ({
    'if (__a === true) __b': 'if (__a) __b',
    'if (__a !== true) __b': 'if (!__a) __b',
    'if (__a === false) __b': 'if (!__a) __b',
    'true && false': 'false',
    'false && true': 'false',
    '__a && true': 'Boolean(__a)',
    'true && __a': '__a',
});

