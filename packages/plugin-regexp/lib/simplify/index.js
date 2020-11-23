'use strict';

const {
    isStringLiteral,
    RegExpLiteral,
} = require('putout').types;

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

const encode = (a) => a.replace('/', '\\/');

function oneArgumentReplace({__a}, path) {
    const {value} = __a;
    
    path.replaceWith({
        ...RegExpLiteral(value),
        extra: {
            raw: `/${encode(value)}/`,
        },
    });
    
    return path;
}

function twoArgumentsReplace({__a, __b}, path) {
    path.replaceWith({
        ...RegExpLiteral(__a.value, __b.value),
        extra: {
            raw: `/${encode(__a.value)}/${__b.value}`,
        },
    });
    
    return path;
}

