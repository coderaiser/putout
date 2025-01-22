'use strict';

const keywords = [
    'as',
    'await',
    'const',
    'continue',
    'for',
    'function',
    'var',
    'let',
    'new',
    'else',
    'export',
    'from',
    'import',
    'return',
    'throw',
    'of',
    'if',
    'yield',
    'typeof',
    'while',
];

module.exports.isKeyword = (name) => {
    return keywords.includes(name);
};
