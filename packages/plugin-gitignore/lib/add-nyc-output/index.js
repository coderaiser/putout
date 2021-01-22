'use strict';

const {match, unshift} = require('../common');

const name = '.nyc_output';

module.exports.report = () => `"${name}" should be added to .gitignore`;
module.exports.match = match(name);
module.exports.replace = unshift(name);

