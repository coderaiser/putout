import {operator} from 'putout';
import * as plugin from '../convert-esm-to-commonjs/index.js';

const {matchFiles} = operator;

export const {
    report,
    fix,
    scan,
} = matchFiles({
    '*.cts': plugin,
});
