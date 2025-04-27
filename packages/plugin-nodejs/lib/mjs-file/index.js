import {operator} from 'putout';
import * as plugin from '../convert-commonjs-to-esm.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    '*.mjs': plugin,
});
