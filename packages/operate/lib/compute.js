'use strict';

const {getBindingPath} = require('./get-binding');
const {extract} = require('./extract');

const NOT_COMPUTED = false;
const COMPUTED = true;

module.exports.compute = compute;
function compute(path) {
    const {node} = path;
    
    if (!path.evaluate)
        throw Error(`☝️ Looks like argument of 'compute' is not 'path'`);
    
    const {confident, value} = path.evaluate();
    
    if (confident)
        return [COMPUTED, value];
    
    if (path.isBinaryExpression())
        return parseBinaryExpression(path);
    
    if (isExtractable(path))
        return [COMPUTED, extract(node)];
    
    const bindingPath = parseBindingPath(path);
    
    if (!bindingPath)
        return [NOT_COMPUTED];
    
    const initPath = bindingPath.get('init');
    
    if (initPath.isObjectExpression() && path.isMemberExpression())
        return parseObjectExpression(path, initPath);
    
    return [NOT_COMPUTED];
}

function parseBindingPath(path) {
    const {node} = path;
    
    if (path.isIdentifier())
        return getBindingPath(path, extract(node));
    
    if (isSimpleMemberExpression(path))
        return getBindingPath(path, extract(node.object));
    
    return null;
}

function parseObjectExpression(path, initPath) {
    const keyPropertyValue = extract(path.node.property);
    
    for (const propertyPath of initPath.get('properties')) {
        const keyPath = propertyPath.get('key');
        
        if (!isExtractable(keyPath))
            return [NOT_COMPUTED];
        
        const keyValue = extract(keyPath);
        
        if (keyValue !== keyPropertyValue)
            continue;
        
        const [is, value] = compute(propertyPath.get('value'));
        
        if (!is)
            break;
        
        return [COMPUTED, value];
    }
    
    return [NOT_COMPUTED];
}

function isExtractable(path) {
    const computed = false;
    const {parentPath} = path;
    
    if (!path.isIdentifier() && !path.isLiteral())
        return false;
    
    if (parentPath.isObjectProperty({computed}))
        return !usedInAssignment(path);
    
    return false;
}

function isSimpleMemberExpression(path) {
    const objectPath = path.get('object');
    
    if (!path.isMemberExpression())
        return false;
    
    if (path.node.computed)
        return false;
    
    return objectPath.isIdentifier();
}

const binary = {
    init: (op, fn) => binary[op] = fn,
};

function parseBinaryExpression(path) {
    const {operator} = path.node;
    const leftPath = path.get('left');
    const rightPath = path.get('right');
    const [computedLeft, left] = compute(leftPath);
    
    if (!computedLeft)
        return [NOT_COMPUTED];
    
    const [computedRight, right] = compute(rightPath);
    
    if (!computedRight)
        return [NOT_COMPUTED];
    
    const line = `return a ${operator} b`;
    const fn = binary[operator] || binary.init(operator, Function('a', 'op', 'b', line));
    
    return [COMPUTED, fn(left, operator, right)];
}

function usedInAssignment(path) {
    const [name] = Object.keys(path.scope.references);
    const binding = path.scope.bindings[name];
    
    if (!binding)
        return false;
    
    const {referencePaths} = binding;
    
    for (const ref of referencePaths) {
        if (ref.parentPath.parentPath?.isAssignmentExpression())
            return true;
    }
    
    return false;
}
