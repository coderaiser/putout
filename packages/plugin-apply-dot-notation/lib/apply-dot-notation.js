'use strict';

const {types} = require('putout');
const {
    isStringLiteral,
    Identifier,
} = types;

module.exports.report = (path) => {
    const {value} = path.node.property;
    
    return `Use dot notation: '[${value}]' -> '.${value}'`;
};

module.exports.fix = ({node}) => {
    const {property} = node;
    
    node.property = Identifier(property.value);
    node.computed = false;
};

module.exports.traverse = ({push}) => ({
    MemberExpression(path) {
        const {node} = path;
        const {property} = node;
        
        if (isStringLiteral(property))
            push(path);
    },
});
