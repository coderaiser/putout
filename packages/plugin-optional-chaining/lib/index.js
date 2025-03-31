import * as convertLogicalAssignToOptional from './convert-logical-assign-to-optional/index.js';
import * as convertLogicalToOptional from './convert-logical-to-optional/index.js';
import * as convertOptionalAssignToLogical from './convert-optional-assign-to-logical/index.js';
import * as convertOptionalToLogical from './convert-optional-to-logical/index.js';

export const rules = {
    'convert-logical-assign-to-optional': ['off', convertLogicalAssignToOptional],
    'convert-logical-to-optional': convertLogicalToOptional,
    'convert-optional-assign-to-logical': convertOptionalAssignToLogical,
    'convert-optional-to-logical': ['off', convertOptionalToLogical],
};
