import {safeAlign} from 'eslint-plugin-putout/config';
import {createESLintConfig} from '@putout/eslint-flat';

export default createESLintConfig([
    safeAlign, {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'module',
        },
    },
]);
