'use strict';

const Module = require('module');

const buildPaths = require('./build-paths');
const {cwd} = process;

const paths = [
    ...buildPaths(cwd()),
    ...module.paths,
];

// Module._findPath is an internal method to Node.js, then one they use to
// lookup file paths when require() is called. So, we are hooking into the
// exact same logic that Node.js uses.
//
// https://github.com/eslint/eslint/blob/v5.12.0/lib/util/module-resolver.js#L69

//module.exports = (name) => Module._findPath(name, paths);
module.exports = (name) => {
    const result = Module._findPath(name, paths);
    return result;
};

