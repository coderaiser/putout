import {safeAlign} from 'eslint-plugin-putout/config';
import {createESLintConfig} from '@putout/eslint-flat';

module.exports = createESLintConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);

export default createESLintConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);

__putout_processor_json({
    'extends': [
        'plugin:n/recommended',
        'plugin:putout/recommended',
    ],
    'plugins': ['n', 'putout'],
    'ignorePatterns': ['**/fixture'],
});
