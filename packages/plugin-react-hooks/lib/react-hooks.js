'use strict';

const applyShortFragment = require('./apply-short-fragment');
const declare = require('./declare');
const renameMethodUnderScore = require('./rename-method-under-score');
const convertStateToHooks = require('./convert-state-to-hooks');
const removeBind = require('./remove-bind');
const removeThis = require('./remove-this');
const removeReact = require('./remove-react');
const convertClassToFunction = require('./convert-class-to-function');
const convertComponentToUseState = require('./convert-component-to-use-state');
const convertImportComponentToUseState = require('./convert-import-component-to-use-state');

module.exports.rules = {
    'apply-short-fragment': applyShortFragment,
    declare,
    'rename-method-under-score': renameMethodUnderScore,
    'convert-state-to-hooks': convertStateToHooks,
    'remove-bind': removeBind,
    'remove-this': removeThis,
    'remove-react': removeReact,
    'convert-class-to-function': convertClassToFunction,
    'convert-component-to-use-state': convertComponentToUseState,
    'convert-import-component-to-use-state': convertImportComponentToUseState,
};
