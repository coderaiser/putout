import {safeAlign} from 'eslint-plugin-putout/config';
import {createESLintConfig} from '@putout/eslint-flat';

export default createESLintConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);
