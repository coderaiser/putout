'use strict';

const convertContextToSource = require('./convert-context-to-source');
const applyFlatConfigToRuleTester = require('./apply-flat-config-to-rule-tester');
const convertRequireResolveToRequire = require('./convert-require-resolve-to-require');
const turnOffSchema = require('./turn-off-schema');

module.exports.rules = {
    'convert-context-to-source': convertContextToSource,
    'apply-flat-config-to-rule-tester': applyFlatConfigToRuleTester,
    'convert-require-resolve-to-require': convertRequireResolveToRequire,
    'turn-off-schema': turnOffSchema,
};
