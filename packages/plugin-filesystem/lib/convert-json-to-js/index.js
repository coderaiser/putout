'use strict';

const {matchFiles} = require('putout').operator;
const convert = require('./convert');

module.exports = matchFiles({
    '__name.json -> __name.js': convert,
});
