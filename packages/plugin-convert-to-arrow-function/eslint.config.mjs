import {safeAlign} from 'eslint-plugin-putout';
import {createESLintConfig} from '@putout/eslint-flat';

export default createESLintConfig([
    safeAlign, {
        rules: {
            'prefer-arrow-callback': 'off',
        },
    },
]);
