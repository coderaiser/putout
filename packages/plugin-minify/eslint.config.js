import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    'README.md{js}': {
        'no-var': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
