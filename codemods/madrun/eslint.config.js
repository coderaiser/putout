import {safeAlign} from 'eslint-plugin-putout/config';

export default [
    ...safeAlign, {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'module',
        },
    },
];
