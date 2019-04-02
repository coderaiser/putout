'use strict';

const {
    ObjectExpression,
    SpreadElement,
    isObjectExpression,
    isIdentifier,
} = require('putout').types;

module.exports.report = () => 'Merge spread should be used instead of Object.assign';

module.exports.fix = (path) => {
    let properties = [];
    const args = path.node.arguments.slice(1);
    for (const arg of args) {
        
        if (isObjectExpression(arg)) {
            properties = properties.concat(arg.properties);
            continue;
        }
        
        properties = properties.concat(SpreadElement(arg));
    
    }
    
    path.replaceWith(ObjectExpression(properties));
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(path) {
            const {node} = path;
            
            if (!isObjectAssign(node))
                return;
            
            const [first] = node.arguments;
            
            if (isObjectExpression(first) && !first.properties.length)
                push(path);
        },
    });
};

function isObjectAssign(node) {
    const {callee} = node;
    const isObject = isIdentifier(callee.object, {name: 'Object'});
    const isAssign = isIdentifier(callee.property, {name: 'assign'});
    
    return isObject && isAssign;
}

