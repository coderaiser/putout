'use strict';

const declarations = [
    'export',
    'const',
    'var',
    'let',
    'import',
];

const conditions = ['if'];

const keywords = [
    ...conditions,
    ...declarations,
    'as',
    'await',
    'continue',
    'for',
    'function',
    'new',
    'else',
    'export',
    'from',
    'return',
    'throw',
    'of',
    'yield',
    'typeof',
    'while',
];

module.exports.isKeyword = (name) => {
    return keywords.includes(name);
};

module.exports.isDeclarationKeyword = (name) => {
    return declarations.includes(name);
};

module.exports.isConditionKeyword = (name) => {
    return conditions.includes(name);
};
