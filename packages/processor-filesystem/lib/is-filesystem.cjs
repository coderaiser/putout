'use strict';

const {name} = require('./name.cjs');

module.exports.isFilesystem = (source) => !source.indexOf(name);
