'use strict';

const {traverse} = require('@putout/babel');

module.exports.traverseProperties = (path, name) => {
    const collector = [];
    const node = path.node || path;
    
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
