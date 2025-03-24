import {operator} from 'putout';

const {remove} = operator;

export const report = () => 'Avoid empty property values';

export const fix = (path) => {
    remove(path.parentPath);
};

export const include = () => [
    'ObjectExpression',
    'ArrayExpression',
];

export const filter = (path) => {
    const {parentPath, node} = path;
    
    const {properties, elements} = node;
    
    if (!parentPath.isObjectProperty())
        return false;
    
    const key = parentPath.get('key').node.value;
    
    if (!/rules|match|plugins/.test(key))
        return false;
    
    if (path.isObjectExpression())
        return !properties.length;
    
    return !elements.length;
};
