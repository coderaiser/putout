'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;

const {
    ObjectExpression,
    SpreadElement,
    isObjectExpression,
    isIdentifier,
} = types;

module.exports.report = () => 'Merge spread should be used instead of Object.assign';

module.exports.fix = (path) => {
    let properties = [];
    const args = path.node.arguments;
    for (const arg of args) {
        if (isObjectExpression(arg)) {
            properties = properties.concat(arg.properties);
            continue;
        }
        
        properties = properties.concat(SpreadElement(arg));
    
    }
    
    replaceWith(path, ObjectExpression(properties));
};

module.exports.traverse = ({push}) => {
    return {
        CallExpression(path) {
            const {node} = path;
            
            if (!isObjectAssign(node))
                return;
            
            const [first] = node.arguments;
            
            if (isObjectExpression(first))
                push(path);
        },
    };
};

function isObjectAssign(node) {
    const {callee} = node;
    const isObject = isIdentifier(callee.object, {name: 'Object'});
    const isAssign = isIdentifier(callee.property, {name: 'assign'});
    
    return isObject && isAssign;
}

