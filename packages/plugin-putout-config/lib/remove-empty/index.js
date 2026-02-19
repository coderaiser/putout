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
    
    if (!isKey(parentPath))
        return false;
    
    if (path.isObjectExpression())
        return !properties.length;
    
    return !elements.length;
};

function isKey(parentPath) {
    const key = parentPath.get('key').node.value;
    
    if (!/rules|plugins|match/.test(key)) {
        const keyPath = parentPath.parentPath.parentPath.get('key');
        
        if (!keyPath.node)
            return false;
        
        const {value} = keyPath.node;
        
        if (value !== 'match')
            return false;
    }
    
    return true;
}
