'use strict';

const argumentsRule = require('./arguments');
const destructuring = require('./destructuring');
const method = require('./method');
const unused = require('./unused');
const jsonParse = require('./json-parse');

module.exports.rules = {
    'arguments': argumentsRule,
    destructuring,
    method,
    unused,
    'json-parse': jsonParse,
};
