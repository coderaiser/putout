import {extname} from 'node:path';
import {types} from 'putout';

const {isStringLiteral} = types;

export const report = (path) => {
    const [arg] = path.node.arguments;
    const {value} = arg;
    
    const ext = extname(value);
    
    if (!ext)
        return `${value}.js`;
    
    return value;
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
    
    return value.startsWith('.');
};
