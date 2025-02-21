import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';

export const match = {
    '*.md{js}': {
        'putout/remove-duplicate-extensions': 'off',
    },
};

export default createESLintConfig([safeAlign, matchToFlat(match)]);
