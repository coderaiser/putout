import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'putout/remove-newline-after-default-import': 'off',
        'putout/multiple-properties-destructuring': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
