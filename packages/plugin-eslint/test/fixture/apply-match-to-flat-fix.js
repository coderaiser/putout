import x from 'x';
import {safeAlign} from 'eslint-plugin-putout/config';
import {matchToFlat} from '@putout/eslint-flat';

const config = matchToFlat({
    '*.d.ts': {
        'no-var': 'off',
    },
    '*.spec.*': {
        'node/no-extraneous-import': 'off',
    },
});

export default [
    ...safeAlign,
    ...config,
];
