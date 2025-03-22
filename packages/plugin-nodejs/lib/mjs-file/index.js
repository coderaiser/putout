import {operator} from 'putout';
import * as plugin from '../convert-commonjs-to-esm.js';

const {matchFiles} = operator;
const {
    report,
    fix,
    scan,
} = matchFiles({
    '*.mjs': plugin,
});

export {
    report,
    fix,
    scan,
};
