import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '**/bin/putout.js': {
        'n/hashbang': 'off',
    },
    '**/scripts/**': {
        'n/hashbang': 'off',
    },
    '**/register.js': {
        'n/no-unsupported-features/node-builtins': 'off',
    },
    '**/chalk.js': {
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

export default defineConfig([
    safeAlign,
    matchToFlat(match), {
        ignores: ['**/fixture'],
    },
]);
