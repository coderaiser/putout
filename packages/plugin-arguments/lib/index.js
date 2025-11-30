import * as removeUseless from './remove-useless/index.js';
import * as removeUselessFromMethod from './remove-useless-from-method/index.js';
import * as removeUnused from './remove-unused/index.js';
import * as jsonParse from './json-parse/index.js';

export const rules = {
    'remove-useless': removeUseless,
    'remove-useless-form-method': removeUselessFromMethod,
    'remove-unused': removeUnused,
    'json-parse': jsonParse,
};
