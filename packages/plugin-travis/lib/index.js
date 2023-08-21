'use strict';

const setNodeVersions = require('./set-node-versions');
const disableCache = require('./disable-cache');

module.exports.rules = {
    'set-node-versions': setNodeVersions,
    'disable-cache': disableCache,
};
