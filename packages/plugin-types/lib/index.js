'use strict';

const applyIsArray = require('./apply-is-array');
const declare = require('./declare');
const convertTypeofToIsType = require('./convert-typeof-to-is-type');
const removeUselessConversion = require('./remove-useless-conversion');
const removeUselessConstructor = require('./remove-useless-constructor');
const removeDoubleNegations = require('./remove-double-negations');
const removeUselessTypeof = require('./remove-useless-typeof');

module.exports.rules = {
    'apply-is-array': applyIsArray,
    declare,
    'convert-typeof-to-is-type': convertTypeofToIsType,
    'remove-useless-conversion': removeUselessConversion,
    'remove-useless-constructor': removeUselessConstructor,
    'remove-double-negations': removeDoubleNegations,
    'remove-useless-typeof': removeUselessTypeof,
};
