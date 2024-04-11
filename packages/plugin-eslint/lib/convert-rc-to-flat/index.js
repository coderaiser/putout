'use strict';

const {operator} = require('putout');

const rcToFlat = require('./rc-to-flat/index.js');
const declare = require('../declare');

const {matchFiles} = operator;

module.exports = matchFiles({
    '.eslintrc.json -> eslint.config.js': {
        rules: {
            rcToFlat,
            declare,
        },
    },
});
