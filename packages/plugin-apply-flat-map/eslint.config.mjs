import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'no-useless-return': 'off',
        'no-else-return': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
