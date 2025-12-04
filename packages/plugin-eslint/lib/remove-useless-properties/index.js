import {operator, types} from 'putout';

const {
    isObjectProperty,
    isSpreadElement,
} = types;

const {extract, remove} = operator;

export const report = (path) => {
    const names = getPropertyNames(path);
    return `Remove useless properties: ${names.join(', ')}`;
};

export const fix = (path) => {
    const {parentPath} = path.parentPath;
    
    if (!parentPath.node)
        return remove(path.parentPath);
    
    remove(parentPath);
};

export const traverse = ({push}) => ({
    ObjectExpression(path) {
        if (path.node.innerComments)
            return;
        
        if (path.node.properties.length)
            return;
        
        if (!path.parentPath.isObjectProperty())
            return;
        
        if (hasSpread(path))
            return;
        
        const names = getPropertyNames(path);
        
        if (names.includes('ignores'))
            return;
        
        push(path);
    },
});

const getName = ({key}) => extract(key);

function getPropertyNames(path) {
    const {parentPath} = path.parentPath;
    const {node} = parentPath;
    
    if (!node)
        return [];
    
    const names = node.properties
        .filter(isObjectProperty)
        .map(getName);
    
    return names;
}

function hasSpread(path) {
    const {parentPath} = path.parentPath;
    const {node} = parentPath;
    
    if (!node)
        return 0;
    
    const names = node.properties.filter(isSpreadElement);
    
    return names.length;
}
