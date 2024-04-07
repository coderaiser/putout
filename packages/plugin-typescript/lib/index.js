'use strict';

const typescript = require('./typescript');
const findFile = require('./find-file');
const ctsFile = require('./cts-file');
const mtsFile = require('./mts-file');

module.exports.rules = {
    ...typescript,
    'find-file': ['off', findFile],
    'cts-file': ['off', ctsFile],
    'mts-file': ['off', mtsFile],
};
