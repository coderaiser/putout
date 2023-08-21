'use strict';

const awaitRule = require('./await');
const asyncRule = require('./async');
const args = require('./args');
const declare = require('./declare');
const expandArguments = require('./expand-arguments');
const sync = require('./sync');

module.exports.rules = {
    'await': awaitRule,
    'async': asyncRule,
    args,
    declare,
    'expand-arguments': expandArguments,
    sync,
};
