import {operator} from 'putout';
import * as sortContents from './sort-contents/index.js';

const {matchFiles} = operator;

export const {
    report,
    scan,
    fix,
} = matchFiles({
    'README.md': {
        plugins: [
            ['sort-contents', sortContents],
        ],
    },
});
