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
    'readonly',
    'implements',
    'declare',
    'module',
    'type',
];

const typescriptReserved = [
    'interface',
    'static',
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
    ...typescriptReserved,
    'async',
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
    'default',
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
    const ts = typescript.includes(name);
    const tsReserved = typescriptReserved.includes(name);
    
    return ts || tsReserved;
};
