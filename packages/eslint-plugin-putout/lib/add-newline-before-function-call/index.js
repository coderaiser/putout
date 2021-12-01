'use strict';

const {types} = require('putout');

const {
    isBlockStatement,
    isVariableDeclaration,
    isExpressionStatement,
} = types;

const regExp = /^\n( +)?\n +$/;

module.exports.category = 'typescript';
module.exports.report = () => 'Add newline before function call';

module.exports.filter = ({text, node, getCommentsBefore, getSpacesBeforeNode}) => {
    if (!isExpressionStatement(node.parent))
        return false;
    
    if (getCommentsBefore(node.parent).length)
        return false;
    
    const {parent} = node.parent;
    
    if (!isBlockStatement(parent))
        return false;
    
    const {body} = parent;
    const n = body.length;
    
    if (n < 3)
        return false;
    
    const spaces = getSpacesBeforeNode(node, text);
    
    if (regExp.test(spaces))
        return false;
    
    for (let i = 2; i < n; i++) {
        const current = body[i];
        
        if (current !== node.parent)
            continue;
        
        const prevA = body[i - 1];
        const nextA = body[i + 1];
        
        if (!isVariableDeclaration(prevA))
            return false;
        
        const spaces = getSpacesBeforeNode(prevA);
        
        if (regExp.test(spaces))
            return false;
        
        if (!nextA)
            return true;
        
        const nextSpaces = getSpacesBeforeNode(nextA);
        return !regExp.test(nextSpaces);
    }
    
    return false;
};

module.exports.fix = ({text}) => {
    return `\n${text}`;
};

module.exports.include = () => [
    'CallExpression',
];

