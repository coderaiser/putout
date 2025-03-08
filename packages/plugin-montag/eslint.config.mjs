import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.js': {
        'no-useless-escape': 'off',
    },
    '*.md{js}': {
        'no-useless-return': 'off',
        'no-else-return': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
