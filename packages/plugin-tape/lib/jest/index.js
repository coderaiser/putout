'use strict';

module.exports.report = () => `Use '📼Supertape' instead of 'Jest'`;

module.exports.replace = () => ({
    'it': 'test',
    'expect(__a).toEqual(__b)': 't.equal(__a, __b)',
});

