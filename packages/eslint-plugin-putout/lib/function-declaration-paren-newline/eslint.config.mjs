import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'putout/function-declaration-paren-newline': 'off',
        'function-paren-newline': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
