import * as removeDuplicate from './remove-duplicate/index.js';
import * as applyRest from './apply-rest/index.js';
import * as removeUseless from './remove-useless/index.js';
import * as removeUselessFromMethod from './remove-useless-from-method/index.js';
import * as removeUnused from './remove-unused/index.js';
import * as applyJsonParse from './apply-json-parse/index.js';

export const rules = {
    'apply-rest': applyRest,
    'remove-useless': removeUseless,
    'remove-useless-form-method': removeUselessFromMethod,
    'remove-unused': removeUnused,
    'apply-json-parse': applyJsonParse,
    'remove-duplicate': removeDuplicate,
};
