import {operator} from 'putout';
import * as convertCommonjsToEsm from '../convert-commonjs-to-esm/index.js';

const {matchFiles} = operator;
const {
    report,
    fix,
    scan,
} = matchFiles({
    '*.mts': convertCommonjsToEsm,
});

export {
    report,
    fix,
    scan,
};
