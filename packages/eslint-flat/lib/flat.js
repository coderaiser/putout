'use strict';

const {matchToFlatDir} = require('./match-to-flat-dir');
const {matchToFlat} = require('./match-to-flat');
const {mergeESLintConfigs} = require('./merge-eslint-configs');
const {createESLintConfig} = require('./create-eslint-config');

module.exports.matchToFlatDir = matchToFlatDir;
module.exports.matchToFlat = matchToFlat;
module.exports.mergeESLintConfigs = mergeESLintConfigs;
module.exports.createESLintConfig = createESLintConfig;
