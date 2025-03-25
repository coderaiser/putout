import {types, operator} from 'putout';

const {replaceWith} = operator;

const {
    isStringLiteral,
    regExpLiteral,
} = types;

const check = ({__a}) => isStringLiteral(__a);

export const report = () => `Use RegExp literal notation`;

export const match = () => ({
    'new RegExp(__a)': check,
    'new RegExp(__a, __b)': check,
    
    'RegExp(__a)': check,
    'RegExp(__a, __b)': check,
});

export const replace = () => ({
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
        ...regExpLiteral(value),
        raw,
        extra: {
            raw,
        },
    });
}

function twoArgumentsReplace({__a, __b}, path) {
    const raw = `/${encode(__a.value)}/${__b.value}`;
    
    return replaceWith(path, {
        ...regExpLiteral(encode(__a.value), __b.value),
        raw,
        extra: {
            raw,
        },
    });
}
