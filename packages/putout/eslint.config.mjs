import {matchToFlat} from '../eslint-flat/lib/flat.js';
import {safeAlign} from 'eslint-plugin-putout/config';

export const match = {
    '**/bin/putout.mjs': {
        'n/hashbang': 'off',
    },
    '**/register.mjs': {
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

export default [
    ...safeAlign,
    ...matchToFlat(match), {
        ignores: ['**/fixture'],
    }];
