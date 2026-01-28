import * as applyRest from './apply-rest/index.js';
import * as applyJsonParse from './apply-json-parse/index.js';
import * as convertExpressionToArguments from './convert-expression-to-arguments/index.js';
import * as removeDuplicate from './remove-duplicate/index.js';
import * as removeUseless from './remove-useless/index.js';
import * as removeUselessFromMethod from './remove-useless-from-method/index.js';
import * as removeUnused from './remove-unused/index.js';

export const rules = {
    'apply-json-parse': applyJsonParse,
    'apply-rest': applyRest,
    'convert-expression-to-arguments': convertExpressionToArguments,
    'remove-useless': removeUseless,
    'remove-useless-form-method': removeUselessFromMethod,
    'remove-unused': removeUnused,
    'remove-duplicate': removeDuplicate,
};
