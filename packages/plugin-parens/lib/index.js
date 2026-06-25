import * as removeUselessFromObject from './remove-useless-from-object/index.js';
import * as addMissingForAwait from './add-missing-for-await/index.js';
import * as addMissingForTemplate from './add-missing-for-template/index.js';
import * as addMissingForAssign from './add-missing-for-assign/index.js';
import * as removeUselessFromAwait from './remove-useless-from-await/index.js';
import * as removeUselessFromParams from './remove-useless-from-params/index.js';

export const rules = {
    'add-missing-for-awai': addMissingForAwait,
    'add-missing-for-template': addMissingForTemplate,
    'add-missing-for-assign': addMissingForAssign,
    'remove-useless-from-await': removeUselessFromAwait,
    'remove-useless-from-params': removeUselessFromParams,
    'remove-useless-from-object': removeUselessFromObject,
};
