import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'putout/remove-empty-newline-after-import': 'off',
    },
};
export default createESLintConfig([
    safeAlign, {
        rules: {
            'n/no-unsupported-features/node-builtins': 'off',
        },
    },
    matchToFlat(match),
]);
