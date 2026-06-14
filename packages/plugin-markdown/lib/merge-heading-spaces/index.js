import {operator, types} from 'putout';

const {isStringLiteral} = types;

const {
    setLiteralValue,
    __markdown,
    compare,
} = operator;

export const report = () => `Merge heading spaces`;

export const fix = (path) => {
    const arg = path.get('arguments.1');
    const value = arg.node.value.replace('  ', ' ');
    
    setLiteralValue(arg, value);
};

export const include = () => [
    'heading(__a, __b)',
];

export const filter = (path) => {
    const arg = path.get('arguments.1');
    
    if (!compare(path.parentPath.parentPath, __markdown))
        return false;
    
    if (!isStringLiteral(arg))
        return false;
    
    const {value} = arg.node;
    
    return value.includes('  ');
};
