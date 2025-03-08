import {defineConfig} from 'eslint/config';
import {safeAlign} from 'eslint-plugin-putout';

export default defineConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);

module.exports = defineConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);
