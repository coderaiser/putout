import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    'lib/parsers/*': {
        'n/no-unpublished-require': 'off',
    },
};

export default defineConfig([
    safeAlign,
    matchToFlat(match),
]);
