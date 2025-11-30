import * as convertObjectToArray from './convert-object-to-array/index.js';
import * as applyObject from './apply-object/index.js';
import * as applyArray from './apply-array/index.js';
import * as removeUselessObject from './remove-useless-object/index.js';
import * as removeUselessArguments from './remove-useless-arguments/index.js';
import * as splitNested from './split-nested/index.js';
import * as splitCall from './split-call/index.js';
import * as mergeProperties from './merge-properties/index.js';

export const rules = {
    'apply-object': applyObject,
    'apply-array': applyArray,
    'remove-useless-object': removeUselessObject,
    'remove-useless-arguments': removeUselessArguments,
    'convert-object-to-array': convertObjectToArray,
    'split-nested': splitNested,
    'split-call': splitCall,
    'merge-properties': mergeProperties,
};
