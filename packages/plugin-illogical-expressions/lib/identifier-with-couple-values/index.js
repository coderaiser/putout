'use strict';

const {isIdentifier} = require('putout').types;

module.exports.report = () => `identifier checked for having a couple values in the same time`;

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        LogicalExpression(path) {
            const {
                left,
                right,
                operator,
            } = path.node;
            
            if (operator !== '&&')
                return;
            
            const names = ['left', 'operator'];
            
            const [left1, operator1] = getProperties(left, names);
            const [left2, operator2] = getProperties(right, names);
            
            if (!/===?/.test(operator1))
                return;
            
            if (operator1 !== operator2)
                return;
            
            if (!sameIdentifiers(left1, left2))
                return;
            
            push(path);
        },
    });
};

module.exports.fix = (path) => {
    path.node.operator = '||';
};

function getProperties(obj, names) {
    const result = [];
    
    for (const name of names) {
        result.push(obj[name]);
    }
    
    return result;
}

function sameIdentifiers(a, b) {
    if (!isIdentifier(a) || !isIdentifier(b))
        return false;
    
    return a.name === b.name;
}