import {matchToFlat} from '@putout/eslint-flat';
import {createESLintConfig} from '@putout/eslint-flat';

const {safeAlign} = require('eslint-plugin-putout/config');

const match = {
    'bin/**': {
        'no-process-exit': 'off',
    },
};

module.exports = createESLintConfig([
    safeAlign, {
        'rules': {
            'node/no-unsupported-features/node-builtins': 'off',
        },
    },
    matchToFlat(match),
]);
module.exports.match = match;
