import {operator} from 'putout';
import * as rcToFlat from './rc-to-flat/index.js';
import * as declare from '../declare/index.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    '.eslintrc.json -> eslint.config.js': {
        rules: {
            'eslint/declare': ['on', {
                type: 'esm',
            }],
        },
        plugins: [
            ['eslint/convert-rc-to-flat', rcToFlat],
            ['eslint/declare', declare],
        ],
    },
});
