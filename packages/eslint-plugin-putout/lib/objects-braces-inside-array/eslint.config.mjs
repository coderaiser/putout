import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.spec.js': {
        'putout/objects-braces-inside-array': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
