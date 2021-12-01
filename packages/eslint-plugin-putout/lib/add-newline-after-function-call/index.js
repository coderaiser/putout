'use strict';

const {types} = require('putout');

const {
    isBlockStatement,
    isExpressionStatement,
    isVariableDeclaration,
    isObjectExpression,
    isArrayExpression,
} = types;

const regExp = /^;?\n( +)?\n +$/;

module.exports.category = 'layout';
module.exports.report = () => 'Add newline after function call';

module.exports.filter = ({text, node, getText, getCommentsAfter}) => {
    if (!isExpressionStatement(node.parent))
        return false;
    
    if (getCommentsAfter(node.parent).length)
        return false;
    
    const {parent} = node.parent;
    
    if (!isBlockStatement(parent))
        return false;
    
    const {body} = parent;
    const n = body.length;
    
    if (n < 3)
        return false;
    
    const spaces = getSpacesAfterNode(node, {text, getText});
    
    if (regExp.test(spaces))
        return false;
    
    for (let i = 0; i < n; i++) {
        const current = body[i];
        
        if (current !== node.parent)
            continue;
        
        if (i === n - 1)
            break;
        
        const prev = body[i - 1];
        const next = body[i + 1];
        
        if (!isVariableDeclaration(next))
            break;
        
        const {init} = next.declarations[0];
        
        if (isObjectExpression(init) && init.properties.length)
            return true;
        
        if (isArrayExpression(init) && init.elements.length)
            return true;
        
        const spacesAfterNext = getSpacesAfterNode(next, {getText});
        
        if (regExp.test(spacesAfterNext))
            break;
        
        if (!prev)
            return true;
        
        const spacesAfterPrev = getSpacesAfterNode(prev, {getText});
        return !regExp.test(spacesAfterPrev);
    }
    
    return false;
};

module.exports.fix = ({text}) => {
    return `${text};\n`;
};

module.exports.include = () => [
    'CallExpression',
];

function getSpacesAfterNode(node, {getText, text = getText(node)}) {
    let spaces = '';
    let i = 0;
    
    while (!spaces || /^[ \n;]+$/.test(spaces))
        spaces = getText(node, 0, ++i)
            .replace(text, '');
    
    return spaces.slice(0, -1);
}

