import * as applyAsTypeAssertion from './apply-as-type-assertion/index.js';
import * as applyTypeGuards from './apply-type-guards/index.js';
import * as applyUtilityTypes from './apply-utility-types/index.js';
import * as convertGenericToShorthand from './convert-generic-to-shorthand/index.js';
import * as convertCommonjsToEsm from './convert-commonjs-to-esm/index.js';
import * as convertEsmToCommonjs from './convert-esm-to-commonjs/index.js';
import * as removeDuplicatesFromUnion from './remove-duplicates-from-union/index.js';
import * as removeDuplicateInterfaceKeys from './remove-duplicate-interface-keys/index.js';
import * as removeDuplicateExports from './remove-duplicate-exports/index.js';
import * as removeUselessTypesFromConstants from './remove-useless-types-from-constants/index.js';
import * as removeUselessTypes from './remove-useless-types/index.js';
import * as removeUnusedTypes from './remove-unused-types/index.js';
import * as removeUselessMappedTypes from './remove-useless-mapped-types/index.js';
import * as removeUselessMappingModifiers from './remove-useless-mapping-modifiers/index.js';
import * as removeUselessParens from './remove-useless-parens/index.js';
import * as removeUselessPromise from './remove-useless-promise/index.js';
import * as removeGetterArguments from './remove-getter-arguments/index.js';
import * as removeSetterReturnType from './remove-setter-return-type/index.js';
import * as removeUselessNonNullExpressions from './remove-useless-non-null-expressions/index.js';

export default {
    'apply-as-type-assertion': applyAsTypeAssertion,
    'apply-type-guards': applyTypeGuards,
    'apply-utility-types': applyUtilityTypes,
    'convert-generic-to-shorthand': convertGenericToShorthand,
    'remove-duplicates-from-union': removeDuplicatesFromUnion,
    'remove-duplicate-interface-keys': removeDuplicateInterfaceKeys,
    'remove-duplicate-exports': removeDuplicateExports,
    'remove-useless-types-from-constants': removeUselessTypesFromConstants,
    'remove-useless-types': removeUselessTypes,
    'remove-unused-types': removeUnusedTypes,
    'remove-useless-mapped-types': removeUselessMappedTypes,
    'remove-useless-mapping-modifiers': removeUselessMappingModifiers,
    'remove-useless-non-null-expressions': removeUselessNonNullExpressions,
    'remove-useless-parens': removeUselessParens,
    'remove-useless-promise': removeUselessPromise,
    'remove-getter-arguments': removeGetterArguments,
    'remove-setter-return-type': removeSetterReturnType,
    'convert-commonjs-to-esm': ['off', convertCommonjsToEsm],
    'convert-esm-to-commonjs': ['off', convertEsmToCommonjs],
};
