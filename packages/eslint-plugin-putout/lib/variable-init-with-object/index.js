'use strict';

const {types} = require('putout');
const {isCorrectLoc} = require('../common');

const {isVariableDeclarator} = types;

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each property on separate line';

module.exports.include = () => {
    return [
        `VariableDeclarator[init.type="ObjectExpression"]`,
        `AssignmentExpression[right.type="ObjectExpression"]`,
    ];
};

module.exports.filter = ({node}) => {
    const {
        loc,
        right,
    } = node;
    
    if (isVariableDeclarator(node)) {
        const {init} = node;
        const {properties} = init;
        const {line} = loc.start;
        
        return !isCorrectLoc(line, properties);
    }
    
    const {properties} = right;
    const {line} = loc.start;
    
    return !isCorrectLoc(line, properties);
};

module.exports.fix = ({text}) => {
    return text
        .replace(/,/g, ',\n')
        .replace(/{/g, '{\n')
        .replace(/}/g, '\n}');
};

