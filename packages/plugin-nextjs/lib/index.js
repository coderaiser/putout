'use strict';

const removeAFromLink = require('./remove-a-from-link');
const convertPageToHead = require('./convert-page-to-head');
const updateTsconfigFile = require('./update-tsconfig-file');
const updateTsconfig = require('./update-tsconfig');

module.exports.rules = {
    'remove-a-from-link': removeAFromLink,
    'convert-page-to-head': convertPageToHead,
    'update-tsconfig-file': updateTsconfigFile,
    'update-tsconfig': updateTsconfig,
};
