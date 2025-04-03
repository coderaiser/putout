import * as array from './array/index.js';
import * as emptyArray from './empty-array/index.js';
import * as fn from './fn/index.js';
import * as noop from './noop/index.js';
import * as declare from './declare/index.js';

export const rules = {
    array,
    'empty-array': emptyArray,
    fn,
    noop,
    declare,
};
