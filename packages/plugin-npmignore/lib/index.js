import * as convertLocToLock from './convert-loc-to-lock/index.js';
import * as add from './add/index.js';
import * as sort from './sort/index.js';

export const rules = {
    add,
    sort,
    'convert-loc-to-lock': convertLocToLock,
};
