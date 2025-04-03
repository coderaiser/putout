import * as addMissingForAwait from './add-missing-for-await/index.js';
import * as addMissingForTemplate from './add-missing-for-template/index.js';
import * as addMissingForAssign from './add-missing-for-assign/index.js';
import * as removeUselessForAwait from './remove-useless-for-await/index.js';
import * as removeUselessForParams from './remove-useless-for-params/index.js';

export const rules = {
    'add-missing-for-awai': addMissingForAwait,
    'add-missing-for-template': addMissingForTemplate,
    'add-missing-for-assign': addMissingForAssign,
    'remove-useless-for-await': removeUselessForAwait,
    'remove-useless-for-params': removeUselessForParams,
};
