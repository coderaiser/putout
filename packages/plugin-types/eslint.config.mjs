import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'n/no-deprecated-api': 'off',
        'no-implicit-coercion': 'off',
        'no-extra-boolean-cast': 'off',
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
