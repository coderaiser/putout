'use strict';

const removeUselessProvider = require('./remove-useless-provider');
const removeImplicitRefReturn = require('./remove-implicit-ref-return');
const removeUselessForwardRef = require('./remove-useless-forward-ref');

module.exports.rules = {
    'remove-useless-provider': removeUselessProvider,
    'remove-implicit-ref-return': removeImplicitRefReturn,
    'remove-useless-forward-ref': removeUselessForwardRef,
};
