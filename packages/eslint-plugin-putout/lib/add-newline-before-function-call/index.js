'use strict';

const {types} = require('putout');

const {
    isBlockStatement,
    isVariableDeclaration,
    isExpressionStatement,
} = types;

module.exports.category = 'typescript';
module.exports.report = () => 'Add newline before function call';

module.exports.filter = ({text, node, getText}) => {
    if (!isExpressionStatement(node.parent))
        return false;
    
    const {parent} = node.parent;
    
    if (!isBlockStatement(parent))
        return false;
    
    const {body} = parent;
    const n = body.length;
    
    if (n < 3)
        return false;
    
    const spaces = getSpacesBeforeNode(node, {text, getText});
    
    if (/^\n +\n +$/.test(spaces))
        return false;
    
    for (let i = 2; i < n; i++) {
        const current = body[i];
        
        if (current !== node.parent)
            continue;
        
        const prevA = body[i - 1];
        
        if (!isVariableDeclaration(prevA))
            continue;
        
        const spaces = getSpacesBeforeNode(prevA, {getText});
        
        if (/^\n +\n +$/.test(spaces))
            return false;
        
        return true;
    }
    
    return false;
};

module.exports.fix = ({text}) => {
    return `\n${text}`;
};

module.exports.include = () => [
    'CallExpression',
];

function getSpacesBeforeNode(node, {getText, text = getText(node)}) {
    let spaces = '';
    let i = 0;
    
    while (!spaces || /^[ \n]+$/.test(spaces))
        spaces = getText(node, ++i)
            .replace(text, '');
    
    return spaces.slice(1);
}
