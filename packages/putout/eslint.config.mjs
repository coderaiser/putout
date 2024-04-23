import {matchToFlat, createESLintConfig} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout/config';

export const match = {
    '**/bin/putout.mjs': {
        'n/hashbang': 'off',
    },
    '**/register.mjs': {
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

export default createESLintConfig([
    safeAlign,
    matchToFlat(match), {
        ignores: ['**/fixture'],
    },
]);
