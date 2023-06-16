'use strict';

const {types, operator} = require('putout');

const {replaceWith} = operator;

const {
    isStringLiteral,
    RegExpLiteral,
} = types;

const match = ({__a}) => isStringLiteral(__a);

module.exports.report = () => `Use RegExp literal notation`;

module.exports.match = () => ({
    'new RegExp(__a)': match,
    'new RegExp(__a, __b)': match,
    
    'RegExp(__a)': match,
    'RegExp(__a, __b)': match,
});

module.exports.replace = () => ({
    'new RegExp(__a)': oneArgumentReplace,
    'new RegExp(__a, __b)': twoArgumentsReplace,
    
    'RegExp(__a)': oneArgumentReplace,
    'RegExp(__a, __b)': twoArgumentsReplace,
});

const encode = (a) => a.replaceAll('/', '\\/');

function oneArgumentReplace({__a}, path) {
    const {value} = __a;
    const raw = `/${encode(value)}/`;
    
    return replaceWith(path, {
        ...RegExpLiteral(value),
        raw,
        extra: {
            raw,
        },
    });
}

function twoArgumentsReplace({__a, __b}, path) {
    const raw = `/${encode(__a.value)}/${__b.value}`;
    
    return replaceWith(path, {
        ...RegExpLiteral(encode(__a.value), __b.value),
        raw,
        extra: {
            raw,
        },
    });
}
