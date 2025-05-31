import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Avoid empty nested patterns`;

export const fix = (path) => remove(path.parentPath);

export const filter = (path) => {
    if (path.isArrayPattern() && path.node.elements.length)
        return false;
    
    if (path.isObjectPattern() && path.node.properties.length)
        return false;
    
    return path.parentPath.isObjectProperty();
};

export const include = () => [
    'ArrayPattern',
    'ObjectPattern',
];
