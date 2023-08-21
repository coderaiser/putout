'use strict';

const removeAFromLink = require('./remove-a-from-link');
const convertPageToHead = require('./convert-page-to-head');

module.exports.rules = {
    'remove-a-from-link': removeAFromLink,
    'convert-page-to-head': convertPageToHead,
};
