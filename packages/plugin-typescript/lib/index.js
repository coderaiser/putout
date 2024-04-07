'use strict';

const typescript = require('./typescript');
const findFile = require('./find-file');
const ctsFile = require('./cts-file');

module.exports.rules = {
    ...typescript,
    'find-file': ['off', findFile],
    'cts-file': ['off', ctsFile],
};
