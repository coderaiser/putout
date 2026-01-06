import {types} from '@putout/babel';

const {
    isIdentifier,
    isMemberExpression,
} = types;

const isString = (a) => typeof a === 'string';

export function getBinding(path, node) {
    const name = parseName(node);
    return path.scope.getAllBindings()[name];
}

export const getBindingPath = (path, name) => getBinding(path, name)?.path;

const parseName = (node) => {
    if (isString(node))
        return node;
    
    if (isIdentifier(node))
        return node.name;
    
    if (isMemberExpression(node))
        return parseName(node.object);
    
    return '';
};
