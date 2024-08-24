'use strict';

const typescript = require('./typescript');
const filesystem = require('./filesystem');
const removeUselessNonNullExpression = require('./remove-useless-non-null-expression');

module.exports.rules = {
    ...typescript,
    ...filesystem,
    'remove-useless-non-null-expression': removeUselessNonNullExpression,
};
