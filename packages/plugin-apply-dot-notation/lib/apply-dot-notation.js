'use strict';

const {types} = require('putout');
const {
    isStringLiteral,
    isValidIdentifier,
    identifier,
} = types;

module.exports.report = ({value}) => {
    return `Use dot notation: '["${value}"]' -> '.${value}'`;
};

module.exports.fix = ({value, path}) => {
    const {node} = path;
    
    node.property = identifier(value);
    node.computed = false;
};

module.exports.traverse = ({push}) => ({
    MemberExpression(path) {
        const {node} = path;
        const {property} = node;
        const {value} = property;
        
        if (!isStringLiteral(property))
            return;
        
        if (!isValidIdentifier(value))
            return;
        
        push({
            path,
            value,
        });
    },
});
