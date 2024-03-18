'use strict';

const insertRust = require('./insert-rust/index.js');
const convertNpmToBun = require('./convert-npm-to-bun/index.js');
const installBun = require('./install-bun/index.js');
const setNodeVersions = require('./set-node-versions/index.js');
const updateActions = require('./update-actions/index.js');
const addContinueOnErrorToAddAndCommit = require('./add-continue-on-error-to-add-and-commit/index.js');
const addContinueOnErrorToCoveralls = require('./add-continue-on-error-to-coveralls/index.js');

module.exports.rules = {
    'add-continue-on-error-to-coveralls': addContinueOnErrorToCoveralls,
    'add-continue-on-error-to-add-and-commit': addContinueOnErrorToAddAndCommit,
    'update-actions': updateActions,
    'set-node-versions': setNodeVersions,
    'install-bun': installBun,
    'convert-npm-to-bun': convertNpmToBun,
    'insert-rust': insertRust,
};
