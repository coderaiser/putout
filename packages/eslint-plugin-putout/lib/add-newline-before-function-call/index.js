import {types} from 'putout';

const {
    isBlockStatement,
    isVariableDeclaration,
    isExpressionStatement,
    isProgram,
} = types;

//const regExp = /^\n( +)?\n( +)?$/;
const regExp = /^\n(\s+)?\n(\s+)?((\n(\s+)+)?)$/;

export const report = () => 'Add newline before expression';

export const filter = ({text, node, getCommentsBefore, getSpacesBeforeNode}) => {
    if (!isExpressionStatement(node.parent))
        return false;
    
    if (getCommentsBefore(node.parent).length)
        return false;
    
    const {parent} = node.parent;
    
    if (!isBlockStatement(parent) && !isProgram(parent))
        return false;
    
    const {body} = parent;
    const n = body.length;
    
    if (n < 3)
        return false;
    
    if (body[0].expression === node)
        return false;
    
    const spaces = getSpacesBeforeNode(node, text);
    
    if (!spaces)
        return false;
    
    if (regExp.test(spaces))
        return false;
    
    for (let i = 2; i < n; i++) {
        const current = body[i];
        
        if (current !== node.parent)
            continue;
        
        const prevA = body[i - 1];
        
        if (!isVariableDeclaration(prevA))
            return false;
        
        const spaces = getSpacesBeforeNode(prevA);
        
        return !regExp.test(spaces);
    }
    
    return false;
};

export const fix = ({text}) => {
    return `\n${text}`;
};

export const include = () => [
    'CallExpression',
    'AssignmentExpression',
];
