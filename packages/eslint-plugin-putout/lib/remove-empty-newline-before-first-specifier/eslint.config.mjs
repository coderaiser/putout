import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.spec.js': {
        'putout/remove-empty-newline-before-first-specifier': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
