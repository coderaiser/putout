'use strict';

const {
    isLiteral,
    isObjectExpression,
} = require('@babel/types');

const {getBindingPath} = require('./get-binding');
const {extract} = require('./extract');

const NOT_COMPUTED = false;
const COMPUTED = true;

module.exports.compute = (path) => {
    const {node} = path;
    
    if (isExtractable(path))
        return [true, extract(node)];
    
    const bindingPath = parseBindingPath(path);
    
    if (!bindingPath)
        return [NOT_COMPUTED];
    
    const bindingNode = bindingPath.node;
    
    if (isLiteral(bindingNode.init))
        return [true, extract(bindingNode.init)];
    
    if (isObjectExpression(bindingNode.init))
        return parseObjectExpression(node, bindingNode);
    
    return [NOT_COMPUTED];
};

function parseBindingPath(path) {
    const {node} = path;
    
    if (path.isIdentifier())
        return getBindingPath(path, extract(node));
    
    if (path.isMemberExpression())
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
    
    if (path.isLiteral())
        return true;
    
    if (parentPath.isObjectProperty({computed}))
        return true;
    
    return false;
}

