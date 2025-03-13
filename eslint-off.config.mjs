import {defineConfig} from 'eslint/config';
import defaultConfig from './eslint-conifg.js';

export default defineConfig([
    defaultConfig, {
        ignores: ['*.*', '!**/eslint-plugin-putout'],
    },
]);
