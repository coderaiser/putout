import {createESLintConfig} from '@putout/eslint-flat';
import {recommended} from 'eslint-plugin-putout';

export default createESLintConfig([
    recommended, {
        ignores: ['**/fixture'],
    },
]);
