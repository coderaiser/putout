import * as removeUselessResolve from './remove-useless-resolve/index.js';
import * as convertRejectToThrow from './convert-reject-to-throw/index.js';
import * as convertNewPromiseToAsync from './convert-new-promise-to-async/index.js';
import * as addMissingAwait from './add-missing-await/index.js';
import * as addMissingAsync from './add-missing-async/index.js';
import * as applyAwaitImport from './apply-await-import/index.js';
import * as applyTopLevelAwait from './apply-top-level-await/index.js';
import * as removeUselessAsync from './remove-useless-async/index.js';
import * as removeUselessAwait from './remove-useless-await/index.js';
import * as removeUselessVariables from './remove-useless-variables/index.js';
import * as applyWithResolvers from './apply-with-resolvers/index.js';

export const rules = {
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
