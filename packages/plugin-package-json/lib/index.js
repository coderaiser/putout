import {rules as packageJson} from './package-json.js';
import * as findFile from './find-file/index.js';
import * as removeExportsWithMissingFiles from './remove-exports-with-missing-files/index.js';
import * as removeDuplicateKeywords from './remove-duplicate-keywords/index.js';

export const rules = {
    ...packageJson,
    'find-file': ['off', findFile],
    'remove-exports-with-missing-files': ['off', removeExportsWithMissingFiles],
    'remove-duplicate-keywords': removeDuplicateKeywords,
};
