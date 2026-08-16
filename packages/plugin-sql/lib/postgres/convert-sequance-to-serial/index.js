import {operator, types} from 'putout';

const {
    isArrayExpression,
    identifier,
    callExpression,
    isIdentifier,
    isCallExpression,
} = types;

const {remove} = operator;

export const report = () => `Use 'serial' instead of 'sequence'`;

export const include = () => [
    'createSequence(__a)',
];

export const filter = (path) => {
    const {name} = path.node.arguments[0];
    const {elements} = path.parentPath.node;
    let count = 0;
    
    for (const element of elements) {
        if (hasNextval(element, name))
            ++count;
    }
    
    return count === 1;
};

export const fix = (path) => {
    const {name} = path.node.arguments[0];
    const {elements} = path.parentPath.node;
    
    for (const el of elements)
        replaceNextvalWithSerial(el, name);
    
    remove(path);
};

const hasNextval = (node, name) => {
    if (!node)
        return false;
    
    const children = parseChildren(node);
    
    for (const child of children) {
        if (isNextvalCall(child, name))
            return true;
        
        if (hasNextval(child, name))
            return true;
    }
    
    return false;
};

const isNextvalCall = (node, name) => {
    if (!isCallExpression(node))
        return false;
    
    if (!isIdentifier(node.callee, {name: 'nextval'}))
        return false;
    
    const [first] = node.arguments;
    
    return isIdentifier(first, {
        name,
    });
};

const replaceNextvalWithSerial = (node, name) => {
    if (!node)
        return;
    
    if (isCallExpression(node))
        for (const [i, arg] of node.arguments.entries()) {
            if (isNextvalCall(arg, name)) {
                node.arguments.splice(i - 1, 2, callExpression(identifier('serial'), []));
                return;
            }
        }
    
    const children = parseChildren(node);
    
    for (const child of children)
        replaceNextvalWithSerial(child, name);
    
    for (const child of children)
        replaceNextvalWithSerial(child, name);
};

function parseChildren(node) {
    if (isArrayExpression(node))
        return node.elements;
    
    if (isCallExpression(node))
        return node.arguments;
    
    return [];
}
