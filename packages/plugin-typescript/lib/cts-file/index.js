'use strict';

const {operator} = require('putout');

const plugin = require('../convert-esm-to-commonjs');
const {matchFiles} = operator;

module.exports = matchFiles({
    '*.cts': plugin,
});
