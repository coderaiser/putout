import * as applyObject from './apply-object/index.js';
import * as applyArray from './apply-array/index.js';
import * as extractPropertiesEqualDeep from './extract-properties-equal-deep/index.js';
import * as extractPropertiesNotEqualDeep from './extract-properties-not-equal-deep/index.js';
import * as convertObjectToArray from './convert-object-to-array/index.js';
import * as removeUselessObject from './remove-useless-object/index.js';
import * as removeUselessArguments from './remove-useless-arguments/index.js';
import * as removeUselessVariables from './remove-useless-variables/index.js';
import * as splitNested from './split-nested/index.js';
import * as splitCall from './split-call/index.js';
import * as mergeProperties from './merge-properties/index.js';

export const rules = {
    'apply-array': applyArray,
    'apply-object': applyObject,
    'convert-object-to-array': convertObjectToArray,
    'extract-properties-equal-deep': extractPropertiesEqualDeep,
    'extract-properties-not-equal-deep': extractPropertiesNotEqualDeep,
    'remove-useless-object': removeUselessObject,
    'remove-useless-arguments': removeUselessArguments,
    'remove-useless-variables': removeUselessVariables,
    'split-nested': splitNested,
    'split-call': splitCall,
    'merge-properties': mergeProperties,
};
