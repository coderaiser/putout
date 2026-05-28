import {types, operator} from 'putout';

const {getBindingPath} = operator;
const {
    isObjectProperty,
    isImportDeclaration,
} = types;

export const report = () => `Avoid useless 'source' argument`;

export const filter = (path) => {
    if (isObjectProperty(path.parentPath))
        return false;
    
    const {name} = path.node.callee;
    
    const bindingPath = getBindingPath(path, name);
    
    if (!bindingPath)
        return true;
    
    const {parentPath} = bindingPath;
    
    if (!isImportDeclaration(parentPath))
        return false;
    
    const {value} = parentPath.node.source;
    
    return !value.startsWith('.');
};

export const replace = () => ({
    'findPlaces(__a, __b, __c)': 'findPlaces(__a, __c)',
    'transform(__a, __b, __c)': 'transform(__a, __c)',
    'transformAsync(__a, __b, __c)': 'transformAsync(__a, __c)',
    'tryCatch(transform, __a, __b, __c)': 'tryCatch(transform, __a, __c)',
    'tryCatch(findPlaces, __a, __b, __c)': 'tryCatch(findPlaces, __a, __c)',
});
