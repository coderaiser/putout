import {operator} from 'putout';
import * as convertJsToTs from './convert-js-to-ts/index.js';

const {matchFiles} = operator;

export const {
    report,
    scan,
    fix,
} = matchFiles({
    files: {
        '*.md': {
            plugins: [
                ['convert-js-to-ts', convertJsToTs],
            ],
        },
    },
});
