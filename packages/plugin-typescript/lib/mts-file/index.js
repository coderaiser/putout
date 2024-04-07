'use strict';

const {operator} = require('putout');

const convertCommonjsToEsm = require('../convert-commonjs-to-esm');
const {matchFiles} = operator;

module.exports = matchFiles({
    '*.mts': convertCommonjsToEsm,
});
