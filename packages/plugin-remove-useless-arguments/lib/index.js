'use strict';

const argumentsRule = require('./arguments');
const destructuring = require('./destructuring');
const method = require('./method');
const unused = require('./unused');

module.exports.rules = {
    arguments: argumentsRule,
    destructuring,
    method,
    unused,
};
