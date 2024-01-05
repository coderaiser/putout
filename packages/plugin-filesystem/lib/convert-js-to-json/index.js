'use strict';

const {matchFiles} = require('putout').operator;
const convert = require('./convert');

module.exports = matchFiles({
    '__name.js -> __name.json': convert,
});
