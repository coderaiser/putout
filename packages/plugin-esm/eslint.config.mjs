import {
    matchToFlat,
    createESLintConfig,
} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';

export const match = {
    '*.md{js}': {
        'n/no-deprecated-api': 'off',
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

export default createESLintConfig([
    safeAlign, {
        rules: {
            'no-useless-return': 'off',
        },
    },
    matchToFlat(match),
]);
