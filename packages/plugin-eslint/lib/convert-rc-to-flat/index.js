'use strict';

const rcToFlat = require('./rc-to-flat/index.js');
const {operator} = require('putout');
const {matchFiles} = operator;

module.exports = matchFiles({
    '.eslintrc.json -> eslint.config.js': rcToFlat,
});
