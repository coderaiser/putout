import addMadrunToLint from './add-madrun-to-lint/index.js';
import addFreshLint from './add-fresh-lint/index.js';
import renamePredefinedEslintToPutout from './rename-predefined-eslint-to-putout/index.js';

export const rules = {
    'add-madrun-to-lint': addMadrunToLint,
    'add-fresh-lint': addFreshLint,
    'rename-predefined-eslint-to-putout': renamePredefinedEslintToPutout,
};
