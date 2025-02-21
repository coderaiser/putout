import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'putout/add-newlines-between-specifiers': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
