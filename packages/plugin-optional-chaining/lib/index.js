'use strict';

const convertAssignToOptional = require('./convert-assign-to-optional');
const convertLogicalToOptional = require('./convert-logical-to-optional');
const convertOptionalAssignToLogical = require('./convert-optiional-assign-to-logical');
const convertOptionalToLogical = require('./convert-optional-to-logical');

module.exports.rules = {
    'convert-assign-to-optional': ['off', convertAssignToOptional],
    'convert-logical-to-optional': convertLogicalToOptional,
    'convert-optiional-assign-to-logical': convertOptionalAssignToLogical,
    'convert-optional-to-logical': ['off', convertOptionalToLogical],
};
