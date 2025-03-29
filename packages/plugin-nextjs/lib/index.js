import * as removeAFromLink from './remove-a-from-link/index.js';
import * as convertPageToHead from './convert-page-to-head/index.js';
import * as updateTsconfigFile from './update-tsconfig-file/index.js';
import * as updateTsconfig from './update-tsconfig/index.js';

export const rules = {
    'remove-a-from-link': removeAFromLink,
    'convert-page-to-head': convertPageToHead,
    'update-tsconfig-file': updateTsconfigFile,
    'update-tsconfig': ['off', updateTsconfig],
};
