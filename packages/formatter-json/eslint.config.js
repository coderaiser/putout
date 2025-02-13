import {safeAlign} from 'eslint-plugin-putout/config';

export default [
    ...safeAlign, {
        ignores: ['**/fixture'],
    },
];
