'use strict';

const {types} = require('putout');
const {isCorrectLoc} = require('../common');

const {
    isVariableDeclarator,
    isAssignmentExpression,
    isTSTypeAliasDeclaration,
} = types;

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each property on separate line';

module.exports.include = () => [
    `VariableDeclarator[init.type="ObjectExpression"]`,
    `AssignmentExpression[right.type="ObjectExpression"]`,
    `TSTypeAliasDeclaration[typeAnnotation.type="TSTypeLiteral"]`,
    `TSInterfaceDeclaration`,
];

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
    
    if (isAssignmentExpression(node)) {
        const {properties} = right;
        const {line} = loc.start;
        
        return !isCorrectLoc(line, properties);
    }
    
    if (isTSTypeAliasDeclaration(node)) {
        const {members} = node.typeAnnotation;
        const {line} = loc.start;
        
        return !isCorrectLoc(line, members);
    }
    
    const {body} = node.body;
    const {line} = loc.start;
    
    return !isCorrectLoc(line, body);
};

module.exports.fix = ({text}) => {
    return text
        .replace(/,/g, ',\n    ')
        .replace(/{/g, '{\n    ')
        .replace(/}/g, '\n}');
};

