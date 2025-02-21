import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'prefer-const': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
