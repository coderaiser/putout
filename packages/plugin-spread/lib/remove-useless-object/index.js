import {types} from 'putout';

const {
    isCallExpression,
    isReturnStatement,
    isSpreadElement,
    isObjectProperty,
} = types;

export const report = () => `Avoid useless spread '...'`;

export const exclude = () => [
    '({...__b && {__c: __d}})',
    '__a = {...__a}',
];

export const replace = () => ({
    '({...__a})': '__a',
});

export const filter = (path) => {
    const {node, parentPath} = path;
    const [first] = node.properties;
    
    const {trailingComments} = first;
    
    if (trailingComments?.length)
        return false;
    
    if (isObjectProperty(parentPath))
        return true;
    
    if (isCallExpression(parentPath) && isSpreadElement(first))
        return true;
    
    if (isCallExpression(first.argument))
        return true;
    
    return isReturnStatement(path.parentPath);
};
