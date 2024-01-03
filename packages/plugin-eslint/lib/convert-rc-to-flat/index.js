'use strict';

const {matchFiles} = require('putout').operator;
const rcToFlat = require('./rc-to-flat');

module.exports = matchFiles({
    '.eslintrc.json -> eslint.config.js': rcToFlat,
});
