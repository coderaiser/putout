'use strict';

const {traverse, types} = require('@putout/babel');
const {extract} = require('../extract');

const {
    isCallExpression,
    isObjectExpression,
} = types;

const nodeOrPath = (path) => path.node || path;

function getNode(path) {
    if (!isObjectExpression(path))
        return nodeOrPath(path);
    
    if (isCallExpression(path.parentPath))
        return path.parentPath.node;
    
    return {
        type: 'ExpressionStatement',
        expression: nodeOrPath(path),
    };
}

module.exports.traverseProperties = (path, name, {firstLevel = false} = {}) => {
    const collector = [];
    const node = getNode(path);
    
    const fn = collect({
        name,
        collector,
    });
    
    if (firstLevel) {
        fn(path);
        return collector;
    }
    
    traverse(node, {
        noScope: true,
        ObjectExpression: fn,
    });
    
    return collector;
};

const collect = ({name, collector}) => (path) => {
    for (const propertyPath of path.get('properties')) {
        if (propertyPath.isSpreadElement())
            continue;
        
        if (propertyPath.isRestElement())
            continue;
        
        const keyPath = propertyPath.get('key');
        
        if (keyPath.isConditionalExpression())
            continue;
        
        const currentName = extract(keyPath);
        
        if (name === currentName)
            collector.push(propertyPath);
    }
};
