import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';

export const match = {
    'rules/**/*.js': {
        'import/no-extraneous-dependencies': 'off',
    },
};

export default createESLintConfig([safeAlign, matchToFlat(match)]);
