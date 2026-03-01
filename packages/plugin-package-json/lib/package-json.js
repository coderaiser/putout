import * as addType from './add-type/index.js';
import * as removeNyc from './remove-nyc/index.js';
import * as removeCommitType from './remove-commit-type/index.js';
import * as applyHttpsToRepositoryUrl from './apply-https-to-repository-url/index.js';
import * as removeDuplicateKeywords from './remove-duplicate-keywords/index.js';
import * as removeDotSlashFromBin from './remove-dot-slash-from-bin/index.js';
import * as applyJsExtension from './apply-js-extension/index.js';
import * as removeImportsNesting from './remove-imports-nesting/index.js';

export const rules = {
    'add-type': addType,
    'remove-nyc': removeNyc,
    'remove-commit-type': removeCommitType,
    'apply-https-to-repository-url': applyHttpsToRepositoryUrl,
    'remove-duplicate-keywords': removeDuplicateKeywords,
    'remove-imports-nesting': removeImportsNesting,
    'apply-js-extension': applyJsExtension,
    'remove-dot-slash-from-bin': removeDotSlashFromBin,
};
