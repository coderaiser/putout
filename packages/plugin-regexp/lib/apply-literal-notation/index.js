'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    isStringLiteral,
    RegExpLiteral,
} = types;

const match = ({__a}) => isStringLiteral(__a);

module.exports.report = () => `Literal notation of RegExp should be used`;

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

const encode = (a) => a
    .replaceAll('/', '\\/');

function oneArgumentReplace({__a}, path) {
    const {value} = __a;
    
    return replaceWith(path, {
        ...RegExpLiteral(value),
        extra: {
            raw: `/${encode(value)}/`,
        },
    });
}

function twoArgumentsReplace({__a, __b}, path) {
    return replaceWith(path, {
        ...RegExpLiteral(encode(__a.value), __b.value),
        extra: {
            raw: `/${encode(__a.value)}/${__b.value}`,
        },
    });
}

