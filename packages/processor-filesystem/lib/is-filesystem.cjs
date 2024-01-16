'use strict';

const {__filesystem_name} = require('@putout/operator-json');

module.exports.isFilesystem = (source) => !source.indexOf(__filesystem_name);
