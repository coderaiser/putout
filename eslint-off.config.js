import {defineConfig} from 'eslint/config';
import defaultConfig from './eslint-config.js';

export default defineConfig([
    defaultConfig, {
        ignores: ['*.*', '!**/eslint-plugin-putout'],
    },
]);
