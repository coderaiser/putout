'use strict';

const {match, unshift} = require('../common');

module.exports.report = () => 'vim files should be added to .gitignore';

module.exports.match = match('*.swp');
module.exports.replace = unshift('*.swp');

