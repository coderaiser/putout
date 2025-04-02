import {operator} from 'putout';

const {remove} = operator;

export const report = () => 'Remove empty export';

export const fix = (path) => {
    remove(path);
};

export const include = () => [
    'ExportNamedDeclaration',
];

export const filter = (path) => {
    const {specifiers, declaration} = path.node;
    
    return !declaration && !specifiers.length;
};
