'use strict';

const argumentsRule = require('./arguments');
const destructuring = require('./destructuring');
const method = require('./method');

module.exports.rules = {
    arguments: argumentsRule,
    destructuring,
    method,
};
