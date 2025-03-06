'use strict';

const {types, operator} = require('putout');
const {
    objectExpression,
    isObjectExpression,
    isSpreadElement,
    spreadElement,
} = types;
const {compare, replaceWith} = operator;

module.exports.report = () => `Use merge spread instead of 'Object.assign()'`;

module.exports.fix = (path) => {
    let properties = [];
    const args = path.node.arguments;
    
    for (const arg of args) {
        if (isObjectExpression(arg)) {
            properties = properties.concat(arg.properties);
            continue;
        }
        
        properties = properties.concat(spreadElement(arg));
    }
    
    replaceWith(path, objectExpression(properties));
};

module.exports.include = () => [
    'Object.assign(__args)',
];

module.exports.exclude = () => [
    'Object.assign({}, __)',
];

module.exports.filter = ({node}) => {
    const [first] = node.arguments;
    
    if (!compare(first, '__object'))
        return false;
    
    for (const arg of node.arguments) {
        if (isSpreadElement(arg))
            return false;
    }
    
    return true;
};
