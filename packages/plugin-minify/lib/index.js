'use strict';

const applyTernary = require('./apply-ternary');
const applyTemplateLiteral = require('./apply-template-literal');
const convertConstToVar = require('./convert-const-to-var');
const convertIfToLogical = require('./convert-if-to-logical');
const convertStrictEqualToEqual = require('./convert-strict-equal-to-equal');
const extractBody = require('./extract-body');
const expandBindings = require('./expand-bindings');
const mangleNames = require('./mangle-names');
const mergeVariables = require('./merge-variables');
const shortenNames = require('./shorten-names');
const removeVarUndefined = require('./remove-var-undefined');
const removeReturnUndefined = require('./remove-return-undefined');
const inline = require('./inline');
const simplifyFloor = require('./simplify-floor');
const types = require('./types');

module.exports.rules = {
    'apply-ternary': applyTernary,
    'apply-template-literal': applyTemplateLiteral,
    'convert-const-to-var': convertConstToVar,
    'convert-if-to-logical': convertIfToLogical,
    'convert-strict-equal-to-equal': convertStrictEqualToEqual,
    'extract-body': extractBody,
    'expand-bindings': expandBindings,
    'mangle-names': mangleNames,
    'merge-variables': mergeVariables,
    'shorten-names': shortenNames,
    'remove-var-undefined': removeVarUndefined,
    'remove-return-undefined': removeReturnUndefined,
    inline,
    'simplify-floor': simplifyFloor,
    types,
};
