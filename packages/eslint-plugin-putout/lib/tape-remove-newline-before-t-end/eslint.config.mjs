import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'putout/tape-remove-newline-before-t-end': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
