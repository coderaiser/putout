import * as convertCommonjsToEsmExports from './convert-commonjs-to-esm-exports/index.js';
import * as convertCommonjsToEsmCommons from './convert-commonjs-to-esm-commons/index.js';
import * as convertCommonjsToEsmRequire from './convert-commonjs-to-esm-require/index.js';

export const rules = {
    'convert-commonjs-to-esm-exports': convertCommonjsToEsmExports,
    'convert-commonjs-to-esm-common': convertCommonjsToEsmCommons,
    'convert-commonjs-to-esm-require': convertCommonjsToEsmRequire,
};
