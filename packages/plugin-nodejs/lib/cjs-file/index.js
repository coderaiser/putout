import {operator} from 'putout';
import * as plugin from '../convert-esm-to-commonjs/index.js';

const {matchFiles} = operator;
const {
    report,
    fix,
    scan,
} = matchFiles({
    '*.cjs': plugin,
});

export {
    report,
    fix,
    scan,
};
