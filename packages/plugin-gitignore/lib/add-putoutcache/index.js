'use strict';

const {match, push} = require('../common');

module.exports.report = () => '.putoutcache should be added to .gitignore';
module.exports.match = match('.putoutcache');
module.exports.replace = push('.putoutcache');
