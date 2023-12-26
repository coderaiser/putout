import * as addType from './add-type/index.js';
import * as removeNyc from './remove-nyc/index.js';
import * as removeCommitType from './remove-commit-type/index.js';

const rules = {
    'add-type': addType,
    'remove-nyc': removeNyc,
    'remove-commit-type': removeCommitType,
};

export default rules;
