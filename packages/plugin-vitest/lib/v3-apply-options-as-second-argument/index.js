'use strict';

module.exports.report = () => `Pass 'options' in second argument`;

module.exports.replace = () => ({
    'test(__a, __b, __object)': 'test(__a, __object, __b)',
});
