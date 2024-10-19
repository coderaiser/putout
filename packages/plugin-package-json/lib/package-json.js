import * as addType from './add-type/index.js';
import * as removeNyc from './remove-nyc/index.js';
import * as removeCommitType from './remove-commit-type/index.js';
import * as applyHttpsToRepositoryUrl from './appy-https-to-repository-url/index.js';

export const rules = {
    'add-type': addType,
    'remove-nyc': removeNyc,
    'remove-commit-type': removeCommitType,
    'apply-https-to-repository-url': applyHttpsToRepositoryUrl,
};
