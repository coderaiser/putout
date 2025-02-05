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

const typescript = [
    'interface',
    'readonly',
    'static',
    'implements',
    'declare',
    'module',
    'type',
];

const expressions = [
    'as',
    'await',
    'new',
    'yield',
    'typeof',
    'function',
];

const statements = [
    ...conditions,
    ...declarations,
    ...moduleDeclarations,
    ...typescript,
    'break',
    'continue',
    'for',
    'else',
    'from',
    'return',
    'throw',
    'of',
    'while',
    'class',
    'extends',
];

const keywords = [
    ...statements,
    ...expressions,
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

module.exports.isStatementKeyword = (name) => {
    return statements.includes(name);
};

module.exports.isTSKeyword = (name) => {
    return typescript.includes(name);
};
