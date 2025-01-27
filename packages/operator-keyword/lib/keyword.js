'use strict';

const moduleDeclarations = [
    'import',
    'export',
];
const declarations = [
    'const',
    'var',
    'let',
];

const conditions = ['if'];

const keywords = [
    ...conditions,
    ...declarations,
    ...moduleDeclarations,
    'as',
    'await',
    'continue',
    'for',
    'function',
    'new',
    'else',
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

module.exports.isModuleDeclarationKeyword = (name) => {
    return moduleDeclarations.includes(name);
};

module.exports.isConditionKeyword = (name) => {
    return conditions.includes(name);
};
