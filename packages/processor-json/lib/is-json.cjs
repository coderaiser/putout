'use strict';

const {name} = require('./name.cjs');

module.exports.isJSON = (source) => !source.indexOf(name);
