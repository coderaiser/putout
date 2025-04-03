import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{ts}': {
        '@typescript-eslint/no-unused-expressions': 'off',
        'no-unsafe-optional-chaining': 'off',
        '@stylistic/ts/no-extra-parens': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
