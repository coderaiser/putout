'use strict';

const applyAsTypeAssertion = require('./apply-as-type-assertion');
const applyTypeGuards = require('./apply-type-guards');
const applyUtilityTypes = require('./apply-utility-types');
const convertGenericToShorthand = require('./convert-generic-to-shorthand');
const convertCommonjsToEsm = require('./convert-commonjs-to-esm');
const convertEsmToCommonjs = require('./convert-esm-to-commonjs');
const removeDuplicatesFromUnion = require('./remove-duplicates-from-union');
const removeDuplicateInterfaceKeys = require('./remove-duplicate-interface-keys');
const removeDuplicateExports = require('./remove-duplicate-exports');
const removeUselessTypesFromConstants = require('./remove-useless-types-from-constants');
const removeUselessTypes = require('./remove-useless-types');
const removeUnusedTypes = require('./remove-unused-types');
const removeUselessMappedTypes = require('./remove-useless-mapped-types');
const removeUselessMappingModifiers = require('./remove-useless-mapping-modifiers');
const removeUselessParens = require('./remove-useless-parens');
const removeUselessPromise = require('./remove-useless-promise');
const removeGetterArguments = require('./remove-getter-arguments');
const removeSetterReturnType = require('./remove-setter-return-type');
const removeUselessNonNullExpressions = require('./remove-useless-non-null-expressions');

module.exports = {
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
