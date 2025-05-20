import * as argumentsRule from './arguments/index.js';
import * as destructuring from './destructuring/index.js';
import * as method from './method/index.js';
import * as unused from './unused/index.js';
import * as jsonParse from './json-parse/index.js';

export const rules = {
    'arguments': argumentsRule,
    destructuring,
    method,
    unused,
    'json-parse': jsonParse,
};
