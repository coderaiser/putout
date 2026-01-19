import {types} from 'putout';

const {isStringLiteral} = types;

export const report = (path) => {
    const [arg] = path.node.arguments;
    return arg.value;
};

export const fix = () => {};

export const include = () => [
    'require(__a)',
];

export const filter = (path) => {
    const [arg] = path.node.arguments;
    
    if (!isStringLiteral(arg))
        return false;
    
    const {value} = arg;
    
    if (!value.startsWith('.'))
        return false;
    
    return /\.[mc]?js/.test(value);
};
