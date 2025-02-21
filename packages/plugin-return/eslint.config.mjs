import {createESLintConfig} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';

export default createESLintConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);
