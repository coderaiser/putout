'use strict';

const convertCommonjsToEsmExports = require('./convert-commonjs-to-esm-exports');
const convertCommonjsToEsmCommons = require('./convert-commonjs-to-esm-commons');
const convertCommonjsToEsmRequire = require('./convert-commonjs-to-esm-require');

module.exports.rules = {
    'convert-commonjs-to-esm-exports': convertCommonjsToEsmExports,
    'convert-commonjs-to-esm-common': convertCommonjsToEsmCommons,
    'convert-commonjs-to-esm-require': convertCommonjsToEsmRequire,
};
