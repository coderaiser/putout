import {matchToFlat} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export const match = {
    '**/merge-properties/*.spec.js': {
        'n/no-extraneous-import': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
