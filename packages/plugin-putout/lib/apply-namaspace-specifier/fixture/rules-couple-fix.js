import * as addMadrunToLint from './add-madrun-to-lint/index.js';
import * as addFreshLint from './add-fresh-lint/index.js';
import * as renamePredefinedEslintToPutout from './rename-predefined-eslint-to-putout/index.js';

export const rules = {
    'add-madrun-to-lint': addMadrunToLint,
    'add-fresh-lint': addFreshLint,
    'rename-predefined-eslint-to-putout': renamePredefinedEslintToPutout,
};
