import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Avoid empty 'import' statement`;

export const fix = (path) => {
    remove(path);
};

const isCSS = (a) => /\.css/.test(a);
const isMin = (a) => /\.min\./.test(a);

export const include = () => [
    'ImportDeclaration',
];

export const filter = (path, {options}) => {
    const {specifiers, source} = path.node;
    
    const {ignore = []} = options;
    const {value} = source;
    
    if (ignore.includes(value))
        return false;
    
    if (specifiers.length)
        return false;
    
    if (isCSS(value))
        return false;
    
    return !isMin(value);
};
