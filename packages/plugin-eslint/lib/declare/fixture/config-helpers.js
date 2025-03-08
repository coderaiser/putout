import {defineConfig} from 'eslint/config';
import {globalIgnores} from 'eslint/config';

export default defineConfig([
    globalIgnores(['node_modules/', 'dist/', 'coverage/']), {
        files: ['src/**/*.js'],
        rules: {
            semi: 'error',
            'prefer-const': 'error',
        },
    },
]);
