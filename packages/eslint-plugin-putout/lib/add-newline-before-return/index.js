'use strict';

const regExp = /^\n( +)?\n +$/;

module.exports.report = () => `Add newline before 'return'`;

module.exports.filter = ({text, node, getCommentsBefore, getSpacesBeforeNode}) => {
    if (getCommentsBefore(node).length)
        return false;
    
    const {parent} = node;
    const {body} = parent;
    
    if (!body)
        return false;
    
    const n = body.length;
    
    if (n < 3)
        return false;
    
    const spaces = getSpacesBeforeNode(node, text);
    
    if (regExp.test(spaces))
        return false;
    
    for (let i = 2; i < n; i++) {
        const prevA = body[i - 1];
        const spaces = getSpacesBeforeNode(prevA);
        
        if (regExp.test(spaces))
            return false;
    }
    
    return true;
};

module.exports.fix = ({text}) => {
    return `\n${text}`;
};

module.exports.include = () => [
    'ReturnStatement',
];
