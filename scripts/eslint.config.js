import {safeAlign} from 'eslint-plugin-putout';
import {createESLintConfig} from '@putout/eslint-flat';

export default createESLintConfig([
    safeAlign, {
        rules: {
            'n/shebang': 'off',
            'n/no-unsupported-features/node-builtins': 'off',
        },
    },
]);
