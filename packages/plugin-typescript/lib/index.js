'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-as-type-assertion'),
    ...getRule('apply-utility-types'),
    ...getRule('convert-generic-to-shorthand'),
    ...getRule('remove-duplicates-from-union'),
    ...getRule('remove-duplicate-interface-keys'),
    ...getRule('remove-duplicate-exports'),
    ...getRule('remove-useless-types-from-constants'),
    ...getRule('remove-useless-types'),
    ...getRule('remove-unused-types'),
    ...getRule('remove-useless-mapped-types'),
    ...getRule('remove-useless-mapping-modifiers'),
    ...getRule('remove-useless-parens'),
};

