'use strict';

module.exports.report = () => `Use 'Declarator' instead of 'operator.declare()'`;

module.exports.replace = () => ({
    'module.exports = declare(__a)': 'module.exports.declare = () => __a',
});
