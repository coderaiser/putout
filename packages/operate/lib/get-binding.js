import {types} from '@putout/babel';

const {
    isIdentifier,
    isMemberExpression,
} = types;

const isString = (a) => typeof a === 'string';
const isObject = (a) => a && typeof a === 'object';

export function getBinding(path, node) {
    check(path);
    
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

function check(path) {
    if (!isObject(path))
        throw Error(`☝️ Looks like 'path' not object but '${typeof path}'`);
}

