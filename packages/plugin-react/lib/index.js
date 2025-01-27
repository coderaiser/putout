'use strict';

const removeUselessProvider = require('./remove-useless-provider');
const removeImplicitRefReturn = require('./remove-implicit-ref-return');
const removeUselessForwardRef = require('./remove-useless-forward-ref');
const applyCreateRoot = require('./apply-create-root');
const renameJsToJsx = require('./rename-js-to-jsx');
const renameJsxToJs = require('./rename-jsx-to-js');

module.exports.rules = {
    'remove-useless-provider': removeUselessProvider,
    'remove-implicit-ref-return': removeImplicitRefReturn,
    'remove-useless-forward-ref': removeUselessForwardRef,
    'apply-create-root': applyCreateRoot,
    'rename-js-to-jsx': ['off', renameJsToJsx],
    'rename-jsx-to-js': ['off', renameJsxToJs],
};
