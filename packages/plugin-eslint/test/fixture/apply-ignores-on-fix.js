import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

module.exports = defineConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);

export default defineConfig([
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
