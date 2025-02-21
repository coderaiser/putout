import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    'lib/parsers/*': {
        'n/no-unpublished-require': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
