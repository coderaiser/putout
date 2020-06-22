'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    compare,
    replaceWith,
} = operator;

const {
    ObjectExpression,
    SpreadElement,
    isObjectExpression,
    isSpreadElement,
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

module.exports.include = () => [
    'Object.assign(__args)',
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

