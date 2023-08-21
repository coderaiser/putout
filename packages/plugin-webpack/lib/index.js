'use strict';

const applyExternals = require('./apply-externals');
const convertLoaderToUse = require('./convert-loader-to-use');
const convertQueryLoaderToUse = require('./convert-query-loader-to-use');
const convertNodeToResolveFallback = require('./convert-node-to-resolve-fallback');

module.exports.rules = {
    'apply-externals': applyExternals,
    'convert-loader-to-use': convertLoaderToUse,
    'convert-query-loader-to-use': convertQueryLoaderToUse,
    'convert-node-to-resolve-fallback': convertNodeToResolveFallback,
};
