import {safeAlign} from 'eslint-plugin-putout';
import {createESLintConfig} from '@putout/eslint-flat';

export default createESLintConfig([
    safeAlign, {
        rules: {
            'putout/single-property-destructuring': 'off',
        },
    },
]);
