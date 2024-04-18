import {safeAlign} from 'eslint-plugin-putout/config';

export default [
    ...safeAlign, {
        rules: {
            'n/shebang': 'off',
            'n/no-unsupported-features/node-builtins': 'off',
        },
    },
];
