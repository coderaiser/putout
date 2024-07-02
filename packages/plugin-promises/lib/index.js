'use strict';

const removeUselessResolve = require('./remove-useless-resolve');
const convertRejectToThrow = require('./convert-reject-to-throw');
const convertNewPromiseToAsync = require('./convert-new-promise-to-async');
const addMissingAwait = require('./add-missing-await');
const addMissingAsync = require('./add-missing-async');
const applyAwaitImport = require('./apply-await-import');
const applyTopLevelAwait = require('./apply-top-level-await');
const removeUselessAsync = require('./remove-useless-async');
const removeUselessAwait = require('./remove-useless-await');
const removeUselessVariables = require('./remove-useless-variables');
const applyWithResolvers = require('./apply-with-resolvers');

module.exports.rules = {
    'remove-useless-resolve': removeUselessResolve,
    'convert-reject-to-throw': convertRejectToThrow,
    'convert-new-promise-to-async': convertNewPromiseToAsync,
    'add-missing-await': addMissingAwait,
    'add-missing-async': addMissingAsync,
    'apply-await-import': applyAwaitImport,
    'apply-top-level-await': applyTopLevelAwait,
    'remove-useless-async': removeUselessAsync,
    'remove-useless-await': removeUselessAwait,
    'remove-useless-variables': removeUselessVariables,
    'apply-with-resolvers': ['off', applyWithResolvers],
};
