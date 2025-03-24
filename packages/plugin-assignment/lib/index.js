'use strict';

const convertToArrowFunction = require('./convert-to-arrow-function');
const convertToComparison = require('./convert-to-comparison');
const convertToDeclaration = require('./convert-to-declaration');
const simplify = require('./simplify');
const split = require('./split');

module.exports.rules = {
    'convert-to-arrow-function': convertToArrowFunction,
    'convert-to-comparison': convertToComparison,
    'convert-to-declaration': convertToDeclaration,
    'simplify': simplify,
    'split': split,
};
