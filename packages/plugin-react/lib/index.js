'use strict';

const removeUselessProvider = require('./remove-useless-provider');
const removeImplicitRefReturn = require('./remove-implicit-ref-return');

module.exports.rules = {
    'remove-useless-provider': removeUselessProvider,
    'remove-implicit-ref-return': removeImplicitRefReturn,
};
