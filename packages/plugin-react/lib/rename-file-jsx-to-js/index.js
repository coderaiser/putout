import {operator} from 'putout';
import * as isJSX from '../is-jsx/index.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    filename: '*.jsx',
    files: {
        '__name.jsx -> __name.js': isJSX,
    },
});
