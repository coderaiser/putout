'use strict';

const {isObjectExpression} = require('@babel/types');

const {getBindingPath} = require('./get-binding');
const {extract} = require('./extract');

const NOT_COMPUTED = false;
const COMPUTED = true;

module.exports.compute = compute;
function compute(path) {
    const {node} = path;
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
    
    const bindingNode = bindingPath.node;
    
    if (isObjectExpression(bindingNode.init))
        return parseObjectExpression(node, bindingNode);
    
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

function parseObjectExpression(node, bindingNode) {
    const keyPropertyValue = extract(node.property);
    
    for (const property of bindingNode.init.properties) {
        const keyValue = extract(property.key);
        
        if (keyValue === keyPropertyValue)
            return [COMPUTED, extract(property.value)];
    }
    
    return [NOT_COMPUTED];
}

function isExtractable(path) {
    const computed = false;
    const {parentPath} = path;
    
    return parentPath.isObjectProperty({computed});
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

