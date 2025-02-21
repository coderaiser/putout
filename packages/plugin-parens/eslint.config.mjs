import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{ts}': {
        '@typescript-eslint/no-unused-expressions': 'off',
        'no-unsafe-optional-chaining': 'off',
        '@stylistic/ts/no-extra-parens': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
