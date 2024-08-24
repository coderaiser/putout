'use strict';

const typescript = require('./typescript');
const filesystem = require('./filesystem');

module.exports.rules = {
    ...typescript,
    ...filesystem,
};
