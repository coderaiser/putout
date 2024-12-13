'use strict';

const convertLogicalAssignToOptional = require('./convert-logical-assign-to-optional');
const convertLogicalToOptional = require('./convert-logical-to-optional');
const convertOptionalAssignToLogical = require('./convert-optional-assign-to-logical');
const convertOptionalToLogical = require('./convert-optional-to-logical');

module.exports.rules = {
    'convert-logical-assign-to-optional': ['off', convertLogicalAssignToOptional],
    'convert-logical-to-optional': convertLogicalToOptional,
    'convert-optional-assign-to-logical': convertOptionalAssignToLogical,
    'convert-optional-to-logical': ['off', convertOptionalToLogical],
};
