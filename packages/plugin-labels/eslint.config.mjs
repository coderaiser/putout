import {recommended} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    recommended, {
        ignores: ['**/fixture'],
    },
]);
