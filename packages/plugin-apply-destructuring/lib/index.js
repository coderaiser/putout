import * as convertObjectToArray from './convert-object-to-array/index.js';
import * as object from './object/index.js';
import * as array from './array/index.js';
import * as falsy from './falsy/index.js';

export const rules = {
    object,
    array,
    falsy,
    'convert-object-to-array': convertObjectToArray,
};
