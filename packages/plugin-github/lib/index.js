'use strict';

const addContinueOnErrorToCoveralls = require('./add-continue-on-error-to-coveralls');
const addContinueOnErrorToAddAndCommit = require('./add-continue-on-error-to-add-and-commit');
const setNodeVersions = require('./set-node-versions');
const installBun = require('./install-bun');
const convertNpmToBun = require('./convert-npm-to-bun');
const insertRust = require('./insert-rust');
const setVersions = require('./set-versions');

module.exports.rules = {
    'add-continue-on-error-to-coveralls': addContinueOnErrorToCoveralls,
    'add-continue-on-error-to-add-and-commit': addContinueOnErrorToAddAndCommit,
    'set-versions': setVersions,
    'set-node-versions': setNodeVersions,
    'install-bun': installBun,
    'convert-npm-to-bun': convertNpmToBun,
    'insert-rust': insertRust,
};
