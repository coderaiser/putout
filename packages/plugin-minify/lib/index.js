import * as convertLetToVarInsideLabel from './convert-let-to-var-inside-label/index.js';
import * as applyTernary from './apply-ternary/index.js';
import * as applyTemplateLiteral from './apply-template-literal/index.js';
import * as convertConstToLet from './convert-const-to-let/index.js';
import * as convertIfToLogical from './convert-if-to-logical/index.js';
import * as convertStrictEqualToEqual from './convert-strict-equal-to-equal/index.js';
import * as extractBody from './extract-body/index.js';
import * as expandBindings from './expand-bindings/index.js';
import * as mangleNames from './mangle-names/index.js';
import * as mergeVariables from './merge-variables/index.js';
import * as mergeLoops from './merge-loops/index.js';
import * as shortenNames from './shorten-names/index.js';
import * as removeVarUndefined from './remove-var-undefined/index.js';
import * as removeReturnUndefined from './remove-return-undefined/index.js';
import * as inline from './inline/index.js';
import * as simplifyFloor from './simplify-floor/index.js';
import * as types from './types/index.js';
import * as joinContinuedStrings from './join-continued-strings/index.js';
import * as convertReturnToSequenceExpression from './convert-return-to-sequence-expression/index.js';
import * as mergeAssignmentExpressions from './merge-assignment-expressions/index.js';

export const rules = {
    'apply-ternary': applyTernary,
    'apply-template-literal': applyTemplateLiteral,
    'convert-const-to-let': convertConstToLet,
    'convert-if-to-logical': convertIfToLogical,
    'convert-strict-equal-to-equal': convertStrictEqualToEqual,
    'extract-body': extractBody,
    'expand-bindings': expandBindings,
    'mangle-names': mangleNames,
    'merge-variables': mergeVariables,
    'merge-loops': mergeLoops,
    'shorten-names': shortenNames,
    'remove-var-undefined': removeVarUndefined,
    'remove-return-undefined': removeReturnUndefined,
    inline,
    'simplify-floor': simplifyFloor,
    types,
    'join-continued-strings': joinContinuedStrings,
    'convert-return-to-sequence-expression': convertReturnToSequenceExpression,
    'merge-assignment-expressions': mergeAssignmentExpressions,
    'convert-let-to-var-inside-label': convertLetToVarInsideLabel,
};
