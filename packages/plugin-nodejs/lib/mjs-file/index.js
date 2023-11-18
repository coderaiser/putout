'use strict';

const {operator} = require('putout');
const plugin = require('../convert-commonjs-to-esm');

const {matchFiles} = operator;

module.exports = matchFiles({
    '*.mjs': plugin,
});
