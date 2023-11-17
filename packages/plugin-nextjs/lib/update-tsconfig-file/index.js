'use strict';

const {operator} = require('putout');

const updateTSConfig = require('../update-tsconfig');

const {matchFiles} = operator;

module.exports = matchFiles({
    'tsconfig.json': updateTSConfig,
});
