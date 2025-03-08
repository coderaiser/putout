import {matchToFlat} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export const match = {
    'rules/**/*.js': {
        'import/no-extraneous-dependencies': 'off',
    },
};

export default defineConfig([safeAlign, matchToFlat(match)]);
