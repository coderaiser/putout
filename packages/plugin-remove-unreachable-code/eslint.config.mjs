import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'no-unreachable': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
