import {types, operator} from 'putout';

const {replaceWith} = operator;
const {objectProperty} = types;

export const report = () => 'Object Property should be used instead of Method';

export const include = () => [
    'ObjectMethod',
];

export const filter = (path) => {
    if (!path.node.params.length)
        return false;
    
    const firstPath = path.get('params.0');
    
    if (!firstPath.isObjectPattern())
        return false;
    
    return !firstPath.node.properties.length;
};

export const fix = (path) => {
    const keyPath = path.get('key');
    
    path.node.type = 'ArrowFunctionExpression';
    path.node.id = null;
    
    replaceWith(path, objectProperty(keyPath.node, path.node));
};
