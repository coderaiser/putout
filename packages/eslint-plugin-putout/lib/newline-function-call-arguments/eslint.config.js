import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'function-paren-newline': 'off',
        'putout/newline-function-call-arguments': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
