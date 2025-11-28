import * as convertObjectToArray from './convert-object-to-array/index.js';
import * as object from './object/index.js';
import * as array from './array/index.js';
import * as falsy from './falsy/index.js';
import * as splitNested from './split-nested/index.js';
import * as splitCall from './split-call/index.js';
import * as mergeProperties from './merge-properties/index.js';

export const rules = {
    'apply-object': object,
    'apply-array': array,
    'remove-useless-object': falsy,
    'convert-object-to-array': convertObjectToArray,
    'split-nested': splitNested,
    'split-call': splitCall,
    'merge-properties': mergeProperties,
};
