import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'putout/add-newline-after-function-call': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
