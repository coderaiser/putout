import x from 'x';
import {createESLintConfig} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';

export const match = {
    '*.d.ts': {
        'no-var': 'off',
    },
    '*.spec.*': {
        'node/no-extraneous-import': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
