'use strict';

const removeUselessProvider = require('./remove-useless-provider');
const removeImplicitRefReturn = require('./remove-implicit-ref-return');
const removeUselessForwardRef = require('./remove-useless-forward-ref');
const applyCreateRoot = require('./apply-create-root');
const renameFileJsToJsx = require('./rename-file-js-to-jsx');
const renameFileJsxToJs = require('./rename-file-jsx-to-js');

module.exports.rules = {
    'remove-useless-provider': removeUselessProvider,
    'remove-implicit-ref-return': removeImplicitRefReturn,
    'remove-useless-forward-ref': removeUselessForwardRef,
    'apply-create-root': applyCreateRoot,
    'rename-file-js-to-jsx': ['off', renameFileJsToJsx],
    'rename-file-jsx-to-js': ['off', renameFileJsxToJs],
};
