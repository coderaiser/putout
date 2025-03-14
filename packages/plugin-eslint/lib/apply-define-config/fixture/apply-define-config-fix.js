import {safeAlign} from 'eslint-plugin-putout';
import {
    matchToFlat,
    createESLintConfig,
} from '@putout/eslint-flat';

export const match = {
    '**/bin/putout.mjs': {
        'n/hashbang': 'off',
    },
    '**/register.mjs': {
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

export default defineConfig([
    safeAlign,
    matchToFlat(match), {
        ignores: ['**/fixture'],
    },
]);
