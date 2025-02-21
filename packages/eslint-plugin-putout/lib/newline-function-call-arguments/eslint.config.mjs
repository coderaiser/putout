import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'function-paren-newline': 'off',
        'putout/newline-function-call-arguments': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
