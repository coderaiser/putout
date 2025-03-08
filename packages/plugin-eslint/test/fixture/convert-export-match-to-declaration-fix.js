import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

const match = {
    'bin/**': {
        'no-process-exit': 'off',
    },
};

module.exports = defineConfig([
    safeAlign, {
        'rules': {
            'node/no-unsupported-features/node-builtins': 'off',
        },
    },
    matchToFlat(match),
]);
module.exports.match = match;
