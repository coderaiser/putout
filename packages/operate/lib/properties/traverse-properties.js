'use strict';

const {traverse, types} = require('@putout/babel');
const {isObjectExpression} = types;

const nodeOrPath = (path) => path.node || path;

function getNode(path) {
    if (!isObjectExpression(path))
        return nodeOrPath(path);
    
    if (path.parentPath)
        return path.parentPath.node;
    
    return {
        type: 'ExpressionStatement',
        expression: nodeOrPath(path),
    };
}

module.exports.traverseProperties = (path, name) => {
    const collector = [];
    const node = getNode(path);
    
    traverse(node, {
        noScope: true,
        ObjectExpression: collect(name, collector),
    });
    
    return collector;
};

const collect = (name, collector) => (path) => {
    for (const propertyPath of path.get('properties')) {
        const {value} = propertyPath.get('key').node;
        
        if (name === value)
            collector.push(propertyPath);
    }
};
