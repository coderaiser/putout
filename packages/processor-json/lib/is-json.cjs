'use strict';

const {prefix} = require('./prefix.cjs');

module.exports.isJSON = (source) => !source.indexOf(prefix);
