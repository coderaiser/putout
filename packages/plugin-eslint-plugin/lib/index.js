import * as applyGetTokenBefore from './apply-get-token-before/index.js';
import * as removeErrorsType from './remove-errors-type/index.js';
import * as convertContextToSource from './convert-context-to-source/index.js';
import * as applyFlatConfigToRuleTester from './apply-flat-config-to-rule-tester/index.js';
import * as convertRequireResolveToRequire from './convert-require-resolve-to-require/index.js';
import * as turnOffSchema from './turn-off-schema/index.js';
import * as updateEcmaVersion from './update-ecma-version/index.js';

export const rules = {
    'convert-context-to-source': convertContextToSource,
    'apply-flat-config-to-rule-tester': applyFlatConfigToRuleTester,
    'convert-require-resolve-to-require': convertRequireResolveToRequire,
    'turn-off-schema': turnOffSchema,
    'update-ecma-version': updateEcmaVersion,
    'remove-errors-type': removeErrorsType,
    'apply-get-token-before': applyGetTokenBefore,
};
