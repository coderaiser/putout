import * as simplify from './simplify/index.js';
import * as removeBoolean from './remove-boolean/index.js';
import * as removeDuplicates from './remove-duplicates/index.js';
import * as convertBitwiseToLogical from './convert-bitwise-to-logical/index.js';

export const rules = {
    simplify,
    'remove-boolean': removeBoolean,
    'remove-duplicates': removeDuplicates,
    'convert-bitwise-to-logical': convertBitwiseToLogical,
};
