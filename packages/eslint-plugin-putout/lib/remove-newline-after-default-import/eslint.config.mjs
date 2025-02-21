import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'putout/remove-newline-after-default-import': 'off',
        'putout/multiple-properties-destructuring': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
