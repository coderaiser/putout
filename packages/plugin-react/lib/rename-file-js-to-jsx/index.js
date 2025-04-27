import {operator} from 'putout';
import * as isJSX from '../is-jsx/index.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    filename: '*.js',
    files: {
        '__name.js -> __name.jsx': isJSX,
    },
});
