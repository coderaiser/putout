'use strict';

const removeUselessResolve = require('./remove-useless-resolve');
const convertRejectToThrow = require('./convert-reject-to-throw');
const convertNewPromiseToAsync = require('./convert-new-promise-to-async');
const addMissingAwait = require('./add-missing-await');
const applyAwaitImport = require('./apply-await-import');
const applyTopLevelAwait = require('./apply-top-level-await');
const removeUselessAsync = require('./remove-useless-async');
const removeUselessAwait = require('./remove-useless-await');
const removeUselessVariables = require('./remove-useless-variables');

module.exports.rules = {
    'remove-useless-resolve': removeUselessResolve,
    'convert-reject-to-throw': convertRejectToThrow,
    'convert-new-promise-to-async': convertNewPromiseToAsync,
    'add-missing-await': addMissingAwait,
    'apply-await-import': applyAwaitImport,
    'apply-top-level-await': applyTopLevelAwait,
    'remove-useless-async': removeUselessAsync,
    'remove-useless-await': removeUselessAwait,
    'remove-useless-variables': removeUselessVariables,
};
