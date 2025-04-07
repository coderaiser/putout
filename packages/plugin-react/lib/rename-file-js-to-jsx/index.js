import {operator} from 'putout';
import * as isJSX from '../is-jsx/index.js';

const {matchFiles} = operator;
const {
    report,
    fix,
    scan,
} = matchFiles({
    filename: '*.js',
    files: {
        '__name.js -> __name.jsx': isJSX,
    },
});

export {
    report,
    fix,
    scan,
};
