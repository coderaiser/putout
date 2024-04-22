'use strict';

const {matchToFlatDir} = require('./match-to-flat-dir');
const {matchToFlat} = require('./match-to-flat');
const {mergeESLintConfigs} = require('./merge-eslint-configs');

module.exports.matchToFlatDir = matchToFlatDir;
module.exports.matchToFlat = matchToFlat;
module.exports.mergeESLintConfigs = mergeESLintConfigs;
