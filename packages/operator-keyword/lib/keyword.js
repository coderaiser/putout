const moduleDeclarations = [
    'import',
    'export',
    'assert',
    'with',
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
    'debugger',
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

export const isKeyword = (name) => {
    return keywords.includes(name);
};

export const isDeclarationKeyword = (name) => {
    return declarations.includes(name);
};

export const isModuleDeclarationKeyword = (name) => {
    return moduleDeclarations.includes(name);
};

export const isConditionKeyword = (name) => {
    return conditions.includes(name);
};

export const isStatementKeyword = (name) => {
    return statements.includes(name);
};

export const isTSKeyword = (name) => {
    const ts = typescript.includes(name);
    const tsReserved = typescriptReserved.includes(name);
    
    return ts || tsReserved;
};
