'use strict';

const applyExponentiation = require('./apply-exponentiation');
const applyMultiplication = require('./apply-multiplication');
const applyNumericSeparators = require('./apply-numeric-separators');
const convertSqrtToHypot = require('./convert-sqrt-to-hypot');
const declare = require('./declare');
const removeUnchangedZeroDeclarations = require('./remove-unchanged-zero-declarations');

module.exports.rules = {
    'apply-exponentiation': applyExponentiation,
    'apply-multiplication': applyMultiplication,
    'apply-numeric-separators': applyNumericSeparators,
    'convert-sqrt-to-hypot': convertSqrtToHypot,
    declare,
    'remove-unchanged-zero-declarations': removeUnchangedZeroDeclarations,
};
