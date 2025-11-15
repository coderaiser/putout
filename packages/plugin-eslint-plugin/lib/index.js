'use strict';

const removeErrorsType = require('./remove-errors-type/index.js');
const convertContextToSource = require('./convert-context-to-source/index.js');
const applyFlatConfigToRuleTester = require('./apply-flat-config-to-rule-tester/index.js');
const convertRequireResolveToRequire = require('./convert-require-resolve-to-require/index.js');
const turnOffSchema = require('./turn-off-schema/index.js');
const updateEcmaVersion = require('./update-ecma-version/index.js');

module.exports.rules = {
    'convert-context-to-source': convertContextToSource,
    'apply-flat-config-to-rule-tester': applyFlatConfigToRuleTester,
    'convert-require-resolve-to-require': convertRequireResolveToRequire,
    'turn-off-schema': turnOffSchema,
    'update-ecma-version': updateEcmaVersion,
    'remove-errors-type': removeErrorsType,
};
