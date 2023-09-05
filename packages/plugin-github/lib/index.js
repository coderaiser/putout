'use strict';

const addContinueOnErrorToCoveralls = require('./add-continue-on-error-to-coveralls');
const addContinueOnErrorToAddAndCommit = require('./add-continue-on-error-to-add-and-commit');
const setNodeVersions = require('./set-node-versions');
const setCheckoutVersion = require('./set-checkout-version');
const setCoverallsVersion = require('./set-coveralls-version');
const setDockerBuildPushVersion = require('./set-docker-build-push-version');
const setSetupNodeVersion = require('./set-setup-node-version');
const setAddAndCommit = require('./set-add-and-commit');
const installBun = require('./install-bun');
const convertNpmToBun = require('./convert-npm-to-bun');
const insertRust = require('./insert-rust');
const setSetupQuemuVersion = require('./set-setup-quemu-version');

module.exports.rules = {
    'add-continue-on-error-to-coveralls': addContinueOnErrorToCoveralls,
    'add-continue-on-error-to-add-and-commit': addContinueOnErrorToAddAndCommit,
    'set-node-versions': setNodeVersions,
    'set-checkout-version': setCheckoutVersion,
    'set-coveralls-version': setCoverallsVersion,
    'set-docker-build-push-version': setDockerBuildPushVersion,
    'set-setup-node-version': setSetupNodeVersion,
    'set-add-and-commit': setAddAndCommit,
    'install-bun': installBun,
    'convert-npm-to-bun': convertNpmToBun,
    'insert-rust': insertRust,
    'set-setup-quemu-version': setSetupQuemuVersion,
};
