import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'putout/function-declaration-paren-newline': 'off',
        'function-paren-newline': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
