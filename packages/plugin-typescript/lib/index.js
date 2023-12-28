'use strict';

const typescript = require('./typescript');
const findFile = require('./find-file');

module.exports.rules = {
    ...typescript,
    'find-file': ['off', findFile],
};
